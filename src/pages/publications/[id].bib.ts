import { publications } from '../../lib/content';
import { bibtex } from '../../lib/bibtex';
import type { APIRoute } from 'astro';
export function getStaticPaths() { return [...publications.map(p => ({ params: { id: p.id }, props: { text: bibtex(p) } })), { params: { id: 'citations' }, props: { text: publications.map(bibtex).join('\n') } }]; }
export const GET: APIRoute = ({ props }) => new Response(props.text, { headers: { 'Content-Type': 'application/x-bibtex; charset=utf-8' } });
