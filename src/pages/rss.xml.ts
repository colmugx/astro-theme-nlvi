import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../constant/app'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map(post => ({
      ...post.data,
      pubDate: post.data.date || post.data.pubDate,
      link: `/posts/${post.slug}/`,
    })),
  })
}
