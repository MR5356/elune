<script setup>
defineProps({
  title: {
    type: String
  }
})
</script>

<template>
  <div class="p-4 rounded-lg flex flex-col justify-between">
    <div class="flex gap-2 items-center" v-if="title">
      <div class="px-[0.5px] h-[1rem] bg-blue-500 rounded-full text-sm font-medium">&nbsp;</div>
      {{ title }}
    </div>
    <div class="pt-2">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
