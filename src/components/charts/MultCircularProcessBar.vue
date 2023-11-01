<script setup>
import CircularProcessBar from '@/components/charts/CircularProcessBar.vue'
defineProps({
  size: {
    type: Number,
    default: 200
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  percent: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    default: () => ['#36d1dc', '#5b86e5']
  }
})
</script>

<template>
  <div
    class="relative p-0 m-0 flex justify-center items-center"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <CircularProcessBar
      class="absolute top-0 bottom-0 left-0 right-0 m-auto"
      v-for="(item, index) in percent"
      :key="'unique'"
      :size="size - index * (strokeWidth + 1) * 2"
      :percent="item"
      :colors="colors"
      :show-value="index === 0"
      value-format="load"
    />
  </div>
</template>

<style scoped></style>
