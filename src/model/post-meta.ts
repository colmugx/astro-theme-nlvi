import type { ReadTimeResults } from 'reading-time'

export interface PostMeta {
  id: string
  title: string
  date: Date
  readingTime: ReadTimeResults
  subTitle?: string
  description?: string
  updatedDate?: Date
  category?: string
  tags?: string[]
  cover?: string
  pin?: boolean
}

export type PostMetaInList = Omit<PostMeta, 'subTitle' | 'description'>
