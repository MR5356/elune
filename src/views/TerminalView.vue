<script setup>
import { onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Terminal from '@/components/Terminal.vue'
const route = useRoute()

onBeforeUnmount(() => {
  window.name = ''
})
</script>

<template>
  <div class="absolute top-0 bottom-4 left-0 right-4 overflow-hidden rounded-xl">
    <Terminal class="w-full h-full" :uri="'/api/v1/machine/terminal/' + route.params.id" />
  </div>
</template>

<style scoped></style>
