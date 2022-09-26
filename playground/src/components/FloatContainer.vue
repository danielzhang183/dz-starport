<script setup lang="ts">
import { StyleValue } from 'vue';
import { metadata ,proxyEl } from '~/composables/floating'

let rect = $ref<DOMRect | undefined>()

const style = computed<StyleValue>(() => ({
  transition: 'all .5s ease-in-out',
  position: 'fixed',
  top: `${rect?.top}px`,
  left: `${rect?.left}px`
}))

function update() {
  rect = proxyEl.value?.getBoundingClientRect()
}

useEventListener('resize', update)
watchEffect(update)
</script>

<template>
  <div :style="style">
    <slot v-bind="metadata.attrs" />
  </div>
</template>
