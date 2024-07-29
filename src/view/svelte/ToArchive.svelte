<script lang="ts">
  export let tag: string
</script>

<a href={tag ? `/archive/categories/${tag}/2` : '/archive/all/2'} aria-label="Go to archive page">
  <div class="uppercase m-8 flex justify-center">
    <div class="pt-2 px-2 text-main font-texture text-4xl hover:animate-flashBtn rounded-sm">
       {`${tag ? 'More' : 'Archive'}`}
    </div>
  </div>
</a>
