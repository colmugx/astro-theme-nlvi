import type { CollectionEntry } from 'astro:content'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z
    .object({
      title: z.string(),
      subTitle: z.string().optional(),
      category: z.string().optional(),
      description: z.string().optional(),
      tags: z.string().array().nullable().optional(),
      date: z.coerce.date().optional(),
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      cover: z.string().optional(),
      pin: z.boolean().optional()
    })
    .refine(({ date, pubDate }) => date || pubDate)
    .refine(({ cover, heroImage }) => !(cover && heroImage)),
})

export const collections = { blog }
export type BlogEntry = CollectionEntry<'blog'>
