import type { Category } from '../model/category'
import { getCollection, type CollectionEntry } from 'astro:content'

class PostService {
  private static Instance: PostService
  static getInstance() {
    if (!this.Instance) {
      this.Instance = new PostService()
    }

    return this.Instance
  }

  private data: CollectionEntry<'blog'>[] = []

  constructor() {
    this.init()
  }

  list() {
    return this.data.sort((a, b) => {
      const prevDate = a.data.date || a.data.pubDate
      const nextDate = b.data.date || b.data.pubDate
      return nextDate!.valueOf() - prevDate!.valueOf()
    })
  }

  getCategories() {
    return Array.from(new Set(this.data.map(item => item.data.category || '')))
      .filter(Boolean)
      .map<Category>(item => ({
        id: item,
        title: item,
      }))
  }

  getMenu() {
    const index: Category = {
      id: '',
      title: 'Posts',
    }

    return [index].concat(this.getCategories())
  }

  private async init() {
    this.data = await getCollection('blog')
  }
}

export const postService = PostService.getInstance()
export type { PostService }
