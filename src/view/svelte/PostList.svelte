<script lang="ts">
  import type { BlogEntry } from '@content/config'
  import ToArchive from '@view/svelte/ToArchive.svelte'
  import Post from '@component/svelte/Post/PostItem.svelte'
  import { onMount } from 'svelte'
  export let list: BlogEntry[] = []
  export let home: boolean = false

  let category = ''
  let isMax = false
  let _list: BlogEntry[] = []

  onMount(() => {
    const searchParams = new URL(window.location.href).searchParams
    category = searchParams.get('category') || ''

    _list = category ? list.filter(item => item.data.category === category) : list

    // slice items when the count is more than 10.
    isMax = _list.length > 10
    _list = home && isMax ? _list.slice(0, 10) : _list
  })
</script>

<section class="mx-auto my-8 max-w-3xl">
  {#each _list as post}
    <Post {post} showPin={home} />
  {/each}
  {#if isMax}
    <ToArchive tag={category} />
  {/if}
</section>
