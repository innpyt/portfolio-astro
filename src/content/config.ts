
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    description: z.string().optional(),
    weight: z.number().default(0),
    highlight: z.boolean().default(false),
  }),
});

export const collections = {
  projects: projectsCollection,
};
