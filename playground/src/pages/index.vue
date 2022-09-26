<script setup lang="ts">
import { TheImageProxy } from '~/composables/image'
</script>

<template>
  <div>
    <div>Index</div>
    <div>
      <RouterLink
        class="m-3 text-sm btn"
        to="/foo"
      >
        Go
      </RouterLink>
    </div>
    <TheImageProxy w-50 h-50 rounded-xl />
  </div>
</template>
