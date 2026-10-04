import { z } from 'astro/zod';
import profileData from '../data/profile.json';
import publicationData from '../data/publications.json';
import cvData from '../data/cv.json';
import talkData from '../data/talks.json';

const url = z.url();
const nonempty = z.string().min(1);
const publicationSchema = z.object({
  id: nonempty.regex(/^[a-z0-9-]+$/), title: nonempty, authors: z.array(nonempty).min(1), bibtexAuthors: z.array(nonempty).min(1),
  collaboration: nonempty.optional(), type: z.enum(['journal', 'article', 'white-paper', 'proceedings']),
  status: z.enum(['published', 'accepted', 'preprint']), year: z.number().int(), date: nonempty,
  venue: nonempty, volume: nonempty.optional(), issue: nonempty.optional(), pages: nonempty.optional(),
  doi: z.string().regex(/^10\.\d{4,9}\/\S+$/).optional(), arxiv: z.string().regex(/^\d{4}\.\d{4,5}$/).optional(),
  preprintYear: z.number().int().optional(), selectedRank: z.number().int().positive().optional(),
  tags: z.array(nonempty), summary: nonempty, contribution: nonempty.optional(), code: url.optional(),
  sources: z.array(url).min(1), public: z.literal(true),
}).refine(p => p.authors.length === p.bibtexAuthors.length, 'Citation author list must match display metadata')
  .refine(p => p.doi || p.arxiv, 'A public bibliographic link is required')
  .refine(p => p.status !== 'published' || Boolean(p.doi), 'Published records require a verified DOI')
  .refine(p => !p.preprintYear || p.preprintYear <= p.year, 'Preprint date cannot follow publication year');
export type Publication = z.infer<typeof publicationSchema>;
export const publications = z.array(publicationSchema).parse(publicationData)
  .sort((a,b) => b.year-a.year || b.date.localeCompare(a.date));
for (const field of ['id', 'doi', 'arxiv'] as const) {
  const values = publications.map(p => p[field]).filter(Boolean);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate publication ${field}`);
}
export const selected = publications.filter(p => p.selectedRank).sort((a,b) => a.selectedRank! - b.selectedRank!);
export const profile = z.object({
  name: nonempty, nameChinese: nonempty, role: nonempty, affiliation: nonempty, location: nonempty,
  email: z.email().nullable(), descriptor: nonempty, bio: z.array(nonempty), github: url,
  reviewed: nonempty, cvUrl: nonempty,
}).parse(profileData);
export const cv = z.object({
  issued: nonempty, sourceRevision: z.string().nullable(),
  appointments: z.array(z.object({ dates: nonempty, role: nonempty, institution: nonempty, description: nonempty })),
  education: z.array(z.object({ dates: nonempty, degree: nonempty, institution: nonempty, detail: nonempty })),
  awards: z.array(z.object({ year: nonempty, title: nonempty, institution: nonempty })),
  collaborations: z.array(z.object({ name: nonempty, dates: nonempty })),
  service: z.array(nonempty), programming: z.array(nonempty), languages: z.array(nonempty),
}).parse(cvData);
export const talks = z.array(z.object({
  id: nonempty, date: nonempty, displayDate: nonempty, title: nonempty, event: nonempty, kind: nonempty,
  links: z.array(z.object({ label: nonempty, url })),
})).parse(talkData).sort((a,b) => b.date.localeCompare(a.date));
export const publicationUrl = (p: Publication) => p.selectedRank ? `/publications/${p.id}/` : p.doi ? `https://doi.org/${p.doi}` : `https://arxiv.org/abs/${p.arxiv}`;
export const citationVenue = (p: Publication) => p.venue + (p.volume ? ` ${p.volume}` : '') + (p.issue ? `(${p.issue})` : '') + (p.pages ? `, ${p.pages}` : '') + (p.venue === 'arXiv' ? `:${p.arxiv}` : '');
export const typeLabel = (p: Publication) => p.type === 'proceedings' ? 'Conference proceedings' : p.type === 'white-paper' ? 'White paper' : p.status === 'preprint' ? 'Preprint' : 'Journal article';
