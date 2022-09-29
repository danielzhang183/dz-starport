<script setup lang="ts">
import { images } from '~/composables/data'

const mode = ref(false)
const toggle = useToggle(mode)
</script>

<template>
  <div px6 py-2>
    <div p2 flex="~ gap-2" justify-center>
      <button btn @click="toggle()">
        Toggle Size
      </button>
      <RouterLink btn to="/foo" saturate-0>
        Navigate
      </RouterLink>
    </div>

    <div flex="~ gap-4" wrap justify-center>
      <RouterLink
        v-for="img, idx of images"
        :key="img"
        :to="`/${idx}`"
      >
        <Starport
          :port="String(idx)"
          transition-all duration-800
          :class="mode ? 'w-50 h-50' : 'w-60 h-30'"
          :props="{ src: img }"
        >
          <TheImage
            :class="mode ? 'rounded shadow-lg' : ''"
            :src="img"
          />
        </Starport>
      </RouterLink>
    </div>
  </div>
</template>
