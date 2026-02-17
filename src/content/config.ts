
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    image: image(),
    description: z.string().optional(),
    weight: z.number().default(0),
    highlight: z.boolean().default(false),
    old: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
  }),
});

export const collections = {
  projects: projectsCollection,
};
