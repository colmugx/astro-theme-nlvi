import type { APIRoute } from 'astro'
import { postService } from '@service/post'
import { genOGImage } from '@util/genOGImage'
import { AUTHOR } from '@constant/app'
import sharp from 'sharp'

export async function getStaticPaths() {
  const posts = await postService.list()
  return posts.map(post => ({
    params: { slug: post.slug },
    props: post,
  }))
}

export const GET: APIRoute = async function get({ props }) {
  const svg = await genOGImage({ title: props.data.title, author: AUTHOR, color: '#bb2649' })
  const image = await sharp(Buffer.from(svg)).png().toBuffer()
  return new Response(image, {
    headers: { 'Content-Type': 'image/png' },
  })
}
