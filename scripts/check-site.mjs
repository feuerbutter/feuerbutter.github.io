import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
import { parseHTML } from 'linkedom';

const root = new URL('../dist/', import.meta.url).pathname;
const origin = 'https://feuerbutter.github.io';
const publications = JSON.parse(await readFile(new URL('../src/data/publications.json', import.meta.url)));
const profile = JSON.parse(await readFile(new URL('../src/data/profile.json', import.meta.url)));
const files = [];
async function walk(dir) { for (const item of await readdir(dir, { withFileTypes: true })) { const path = join(dir,item.name); if (item.isDirectory()) await walk(path); else files.push(path); } }
await walk(root);
const documents = new Map();
const titles = new Set();
const descriptions = new Set();
let localLinks = 0;
for (const file of files.filter(f => f.endsWith('.html'))) {
  const html = await readFile(file,'utf8');
  const { document: doc } = parseHTML(html);
  const pathname = '/' + relative(root,file).replace(/index\.html$/, '');
  documents.set(pathname,doc);
  assert.equal(doc.documentElement.lang,'en',`${pathname}: document language`);
  assert.equal(doc.querySelectorAll('h1').length,1,`${pathname}: one h1`);
  assert.equal(doc.querySelectorAll('main').length,1,`${pathname}: main landmark`);
  assert.ok(doc.querySelector('header nav[aria-label]'),`${pathname}: named navigation`);
  assert.ok(doc.querySelector('a.skip-link[href="#main"]'),`${pathname}: skip link`);
  assert.ok(!doc.querySelector('h1[aria-hidden="true"], [aria-hidden="true"] h1'),`${pathname}: visible identity`);
  let previousLevel = 0;
  for (const h of doc.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    const level=Number(h.tagName.slice(1)); assert.ok(level<=previousLevel+1,`${pathname}: heading order ${h.textContent}`); previousLevel=level;
  }
  const title=doc.querySelector('title')?.textContent;
  const description=doc.querySelector('meta[name="description"]')?.getAttribute('content');
  assert.ok(title && !titles.has(title),`${pathname}: unique title`); titles.add(title);
  assert.ok(description && !descriptions.has(description),`${pathname}: unique description`); descriptions.add(description);
  assert.equal(doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),origin+pathname,`${pathname}: user-site canonical`);
  assert.equal(doc.querySelectorAll('script').length,0,`${pathname}: no JavaScript required`);
  assert.ok(!/Your Name|your\.name|example\.com|Project [ABC]:|\[Experiment Name\]/i.test(html),`${pathname}: no template content`);
  const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id); assert.equal(ids.length,new Set(ids).size,`${pathname}: unique IDs`);
  for(const img of doc.querySelectorAll('img')) assert.ok(img.hasAttribute('alt'),`${pathname}: image alternative`);
  for(const anchor of doc.querySelectorAll('a')) assert.ok(anchor.textContent.trim() || anchor.getAttribute('aria-label'),`${pathname}: named links`);
  for(const e of doc.querySelectorAll('[href],[src]')) {
    const raw=e.getAttribute('href')??e.getAttribute('src');
    const url=new URL(raw,origin+pathname);
    assert.ok(['https:','mailto:'].includes(url.protocol),`${pathname}: supported URL ${raw}`);
    if(url.origin!==origin) continue;
    const target=join(root,url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname);
    await stat(target).catch(()=>assert.fail(`${pathname}: missing target ${raw}`)); localLinks++;
    if(url.hash && target.endsWith('.html')) {
      const {document: linked}=parseHTML(await readFile(target,'utf8'));
      assert.ok(linked.getElementById(decodeURIComponent(url.hash.slice(1))),`${pathname}: missing fragment ${raw}`);
    }
  }
}
for (const p of publications) {
  assert.equal(documents.get('/publications/').querySelectorAll(`article[id="${p.id}"]`).length,1,`${p.id}: bibliography deduplication`);
  const bib=await readFile(join(root,'publications',p.id+'.bib'),'utf8');
  assert.ok(bib.includes(p.title),`${p.id}: citation title`);
  assert.ok(bib.includes(p.bibtexAuthors.join(' and ')),`${p.id}: full author order`);
  if(p.selectedRank) {
    const doc=documents.get(`/publications/${p.id}/`);
    assert.equal(doc.querySelectorAll('meta[name="citation_author"]').length,p.authors.length,`${p.id}: scholar author metadata`);
    assert.equal(doc.querySelector('meta[name="citation_doi"]').getAttribute('content'),p.doi);
  }
}
assert.equal(documents.get('/publications/').querySelectorAll('meta[name^="citation_"]').length,0,'No paper metadata on bibliography');
const bibliography=await readFile(join(root,'publications/citations.bib'),'utf8');
assert.equal((bibliography.match(/^@/gm)||[]).length,publications.length,'Complete citation export');
const pdf=await readFile(join(root,profile.cvUrl)); assert.equal(pdf.subarray(0,5).toString(),'%PDF-','Public CV download');
assert.equal(documents.get('/404.html').querySelector('meta[name="robots"]').getAttribute('content'),'noindex');
const sitemap=await readFile(join(root,'sitemap.xml'),'utf8');
for(const path of documents.keys()) if(path!=='/404.html') assert.ok(sitemap.includes(origin+path),`Sitemap contains ${path}`);
const home=await readFile(join(root,'index.html'));
const css=await Promise.all(files.filter(f=>extname(f)==='.css').map(f=>readFile(f)));
const rawBytes=home.length+css.reduce((sum,c)=>sum+c.length,0);
const gzipBytes=gzipSync(home).length+css.reduce((sum,c)=>sum+gzipSync(c).length,0);
assert.ok(rawBytes<500_000,'Homepage uncompressed resource budget');
assert.ok(!files.some(f=>/\.(js|mjs)$/.test(f)),'Zero client JS');
console.log(JSON.stringify({htmlPages:documents.size,localLinksChecked:localLinks,publicationRecords:publications.length,homepageHtmlAndCssBytes:rawBytes,homepageHtmlAndCssGzipBytes:gzipBytes,clientJavaScriptBytes:0,result:'pass'},null,2));
