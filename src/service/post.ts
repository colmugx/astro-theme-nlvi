import type { Tag } from '@model/tag'
import type { Category } from '../model/category'
import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'
import { convertDash } from '../util/convertDash'

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

  async listWithCategory(category: string) {
    return (await this.listWithHome()).filter(item => item.data.category === category)
  }

  async getCategories() {
    return Array.from(new Set((await this.getData()).map(item => item.data.category || '')))
      .filter(Boolean)
      .map<Category>(item => ({
        id: item,
        title: item,
      }))
  }

  async getTags() {
    const tagSet = new Set(
      (await this.getData()).reduce<string[]>((acc, item) => acc.concat(item.data.tags || []), []),
    )
    return Array.from(tagSet)
      .filter(Boolean)
      .map<Tag>(item => ({
        id: convertDash(item),
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
