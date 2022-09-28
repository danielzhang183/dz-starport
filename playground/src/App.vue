<script setup lang="ts">

</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200" relative>
    <StarportCarrier>
      <router-view v-slot="{ Component }">
        <transition name="page-fade">
          <component
            :is="Component"
            absolute left-0 right-0 top-25
          />
        </transition>
      </router-view>
    </StarportCarrier>
  </main>
</template>
