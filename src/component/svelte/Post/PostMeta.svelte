<script lang="ts">
  import type { PostMeta } from '@model/post-meta'
  import FormattedDate from '../FormattedDate.svelte'
  export let meta: PostMeta
</script>

<div class="flex flex-col">
  <div class="mx-1 flex items-center text-sm text-gray-400">
    <FormattedDate date={meta.updatedDate || meta.date} />
    {#if meta.category}
      <a
        href={`/categories/${meta.category}`}
        class="relative uppercase dot text-main hover:underline"
        aria-label={`Link to ${meta.category} category page`}
      >
        {meta.category}
      </a>
    {/if}
    {#if meta.readingTime}
      <div class="relative dot">
        {Math.ceil(meta.readingTime.minutes)} mins read
      </div>
    {/if}
  </div>

  <div class="pt-1 mb-8">
    <h1 class="text-8xl uppercase font-bold" aria-label="Post title">
      {meta.title}
    </h1>
    {#if meta.subTitle}
      <div class="pt-4 flex justify-end">
        <h1 class="text-3xl text-gray-400" aria-label="Post subtitle">
          —— {meta.subTitle}
        </h1>
      </div>
    {/if}
  </div>
</div>

<style>
  .dot {
    @apply ml-2 pl-1 before:absolute before:-left-1 before:top-1/2 before:h-0.5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-gray-500;
  }
</style>
