import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION, AUTHOR, SITE_LANG } from '../constant/app'

const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const posts = await getCollection('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    customData: `<language>${SITE_LANG}</language>`,
    items: posts.map(post => ({
      ...post.data,
      link: `/posts/${post.slug}/`,
      pubDate: post.data.date || post.data.pubDate,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
      author: AUTHOR,
    })),
  })
}
