<script setup>
import { onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Terminal from '@/components/Terminal.vue'
import { Newlybuild } from '@icon-park/vue-next'

const route = useRoute()

onBeforeUnmount(() => {
  window.name = ''
})

const openNew = () => {
  window.open(route.fullPath, '_blank')
}
</script>

<template>
  <div class="absolute top-0 bottom-4 left-0 right-4 overflow-hidden rounded-xl">
    <div
      class="absolute right-2 top-2 z-[999] bg-slate-100 rounded-lg p-1 opacity-70 hover:opacity-100"
      @click="openNew"
      title="复制终端"
    >
      <Newlybuild class="w-full h-full" theme="two-tone" size="22" :fill="['#333', '#6abaf3']" />
    </div>
    <Terminal class="w-full h-full" :uri="'/api/v1/machine/terminal/' + route.params.id" />
  </div>
</template>

<style scoped></style>
