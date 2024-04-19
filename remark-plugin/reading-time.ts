import type { RemarkPlugin } from '@astrojs/markdown-remark'
import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export function remarkReadingTime(): RemarkPlugin {
  return (tree, { data }) => {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage, {
      wordsPerMinute: 316
    })
    data.astro.frontmatter.readingTime = readingTime
  }
}
