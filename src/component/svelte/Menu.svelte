<script lang="ts">
  import type { TMenu } from './types'

  export let list: TMenu[] = []
  export let className = ''
  export let mini = false
</script>

<nav
  class={`flex h-full items-center gap-x-4 ${mini ? 'ml-36' : 'relative mx-24 justify-end pt-52'} ${className}`}
>
  {#each list as item}
    <a
      href={item.slug}
      class={`pt-2 font-texture font-bold leading-none text-gray-300 dark:text-gray-400 hover:text-gray-500 ${mini ? 'text-xl' : 'text-5xl'} ${item.active ? 'text-gray-800' : ''}`}
    >
      {item.title}
    </a>
  {/each}
</nav>
