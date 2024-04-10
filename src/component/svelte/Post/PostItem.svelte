<script lang="ts">
  import type { CollectionEntry } from 'astro:content'
  import FormattedDate from '@component/svelte/FormattedDate.svelte'

  export let post: CollectionEntry<'blog'>

  const date = post.data.date || (post.data.pubDate as Date)
</script>

<article class="m-4 rounded-sm border border-transparent p-4 hover:border-gray-300">
  <div class="flex items-center text-sm uppercase text-gray-500">
    <FormattedDate {date} />
    {#if post.data.category}
      <a
        href={`/categories/${post.data.category}`}
        class="relative ml-2 pl-1 text-main before:absolute before:-left-1 before:top-1/2 before:h-0.5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-gray-500 hover:underline"
      >
        {post.data.category}
      </a>
    {/if}
  </div>
  <a href={`/posts/${post.slug}/`}>
    <h2 class="my-2 line-clamp-2 text-4xl font-bold uppercase tracking-wide">{post.data.title}</h2>
  </a>
  {#if post.data.description}
    <div>
      <p>{post.data.description}</p>
    </div>
  {/if}
</article>
