<script lang="ts">
  import type { PostMeta } from '@model/post-meta'
  import FormattedDate from '../FormattedDate.svelte'
  export let meta: PostMeta
</script>

<div class="flex flex-col">
  <div class="mx-1 flex items-center text-sm uppercase text-gray-400">
    <FormattedDate date={meta.date} />
    {#if meta.category}
      <a
        href={`/categories/${meta.category}`}
        class="relative ml-2 pl-1 text-main before:absolute before:-left-1 before:top-1/2 before:h-0.5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-gray-500 hover:underline"
      >
        {meta.category}
      </a>
    {/if}

    {#if meta.updatedData}
      <div class="last-updated-on">
        Last updated on <FormattedDate date={meta.updatedData} />
      </div>
    {/if}
  </div>
  <div class="pt-1 mb-8">
    <h1 class="text-9xl uppercase font-bold">{meta.title}</h1>
    {#if meta.subTitle}
      <span>{meta.subTitle}</span>
    {/if}

  </div>
</div>
