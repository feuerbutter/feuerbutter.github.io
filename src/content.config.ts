import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({ title: z.string(), order: z.number(), summary: z.string(), publications: z.array(z.string()) }),
});
export const collections = { research };
