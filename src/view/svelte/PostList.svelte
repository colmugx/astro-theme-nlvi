<script lang="ts">
  import type { BlogEntry } from '@content/config'
  import Post from '@component/svelte/Post/PostItem.svelte'
  import { onMount } from 'svelte'
  export let list: BlogEntry[] = []

  let _list: BlogEntry[] = []

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
