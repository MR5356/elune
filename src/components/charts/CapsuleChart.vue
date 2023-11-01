<script setup>
import ProcessBar from '@/components/charts/ProcessBar.vue'

defineProps({
  data: {
    type: Array,
    required: true
  },
  fontColor: {
    type: String,
    default: '#000'
  },
  showValue: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex flex-col gap-0">
    <div class="flex gap-2" v-for="item in data" :key="item">
      <div class="w-20 text-justify text-sm truncate" :style="{ color: fontColor }">
        {{ item.name }}
      </div>
      <ProcessBar
        :percent="item.value"
        :show-value="showValue"
        value-format="${value}"
        :font-color="fontColor"
      />
    </div>
  </div>
</template>

<style scoped></style>
