<script lang="ts">
  import type { Category } from '../../model/category'
  import type { TMenu } from '@component/svelte/types'

  import { onMount } from 'svelte'
  import { DISPLAY_SITE_TITLE } from '@constant/app'
  import Menu from '@component/svelte/Menu.svelte'

  export let list: Category[] = []

  const title = DISPLAY_SITE_TITLE.split('\n')

  let menuList: TMenu[] = []
  let isShow = false

  onMount(() => {
    const searchParams = new URL(window.location.href).searchParams
    const category = searchParams.get('category')

    isShow = window.location.pathname === '/'

    menuList = list.map<TMenu>(item => ({
      title: item.title,
      slug: item.id ? `?category=${item.id}` : '/',
      active: category === item.id,
    }))
  })
</script>

<div class="relative mt-20 w-full">
  <div class="absolute left-0 right-0 top-0 -z-10 overflow-hidden">
    <h1
      class="font-texture text-[20vw] font-bold text-stroke-1 text-stroke-gray-100 text-stroke-fill-transparent dark:opacity-5 forced-colors:opacity-5"
    >
      {#each title as str}
        <span class="block even:ml-[2em]">{str}</span>
      {/each}
    </h1>
  </div>

  {#if isShow}
    <Menu list={menuList} />
  {/if}
</div>
