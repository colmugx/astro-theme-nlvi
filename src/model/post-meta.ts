export interface PostMeta {
  id: string
  title: string
  date: Date
  subTitle?: string
  description?: string
  updatedData?: Date
  category?: string
  tags?: string[]
  cover?: string
}

export type PostMetaInList = Omit<PostMeta, 'subTitle' | 'description'>
