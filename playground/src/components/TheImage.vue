<script lang="ts" setup>
const a = $ref(false)
</script>

<template>
  <div overflow-hidden transition-all @click="a = !a">
    <img object-center object-contain v-if="a" src="https://images.unsplash.com/photo-1661956600655-e772b2b97db4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" />
    <img object-center object-contain v-else src="https://images.unsplash.com/photo-1664030391940-261073d09013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
  </div>
</template>
