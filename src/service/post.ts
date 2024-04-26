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

  async list() {
    return (await this.getData()).sort((a, b) => {
      const prevDate = a.data.date || a.data.pubDate
      const nextDate = b.data.date || b.data.pubDate
      return nextDate!.valueOf() - prevDate!.valueOf()
    })
  }

  async listWithHome() {
    return (await this.list()).sort((a, b) =>
      a.data.pin && !b.data.pin ? -1 : !a.data.pin && b.data.pin ? 1 : 0,
    )
  }

  async getCategories() {
    return Array.from(new Set((await this.getData()).map(item => item.data.category || '')))
      .filter(Boolean)
      .map<Category>(item => ({
        id: item,
        title: item,
      }))
  }

  private async getData() {
    if (!this.data.length) {
      this.data = await getCollection('blog')
    }

    return this.data
  }
}

export const postService = PostService.getInstance()
export type { PostService }
