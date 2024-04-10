<script lang="ts">
  import type { CollectionEntry } from 'astro:content'
  import Post from '@component/svelte/Post/PostItem.svelte'
  import { onMount } from 'svelte'
  export let list: CollectionEntry<'blog'>[] = []

  let _list: CollectionEntry<'blog'>[] = []

  onMount(() => {
    const searchParams = new URL(window.location.href).searchParams
    const category = searchParams.get('category')

    _list = category ? list.filter(item => item.data.category === category) : list
  })
</script>

<section class="mx-auto my-8 max-w-3xl">
  {#each _list as post}
    <Post {post} />
  {/each}
</section>
