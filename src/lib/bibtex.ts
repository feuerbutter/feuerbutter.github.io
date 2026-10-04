import type { Publication } from './content';
const escape = (s: string) => s.replace(/[&%_#]/g, '\\$&').replace(/[{}]/g, '');
export function bibtex(p: Publication): string {
  const fields: Record<string, string | undefined> = {
    title: `{${p.title}}`, author: p.bibtexAuthors.join(' and '),
    year: String(p.year), journal: p.venue === 'arXiv' ? undefined : p.venue,
    volume: p.volume, number: p.issue, pages: p.pages, doi: p.doi,
    eprint: p.arxiv, archivePrefix: p.arxiv ? 'arXiv' : undefined,
    url: p.doi ? `https://doi.org/${p.doi}` : `https://arxiv.org/abs/${p.arxiv}`,
    note: p.status === 'preprint' ? 'Preprint' : undefined,
  };
  return `@${p.status === 'preprint' ? 'misc' : 'article'}{Li-${p.year}-${p.id},\n` + Object.entries(fields).filter(([,v]) => v).map(([k,v]) => `  ${k} = {${k === 'title' ? '{'+escape(p.title)+'}' : escape(v!)}},`).join('\n') + '\n}\n';
}
