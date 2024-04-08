<script lang="ts">
  import { SITE_LANG } from '@constant/app'

  export let date: Date
</script>

<time datetime={date.toISOString()}>
  {date.toLocaleDateString(SITE_LANG, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}
</time>
