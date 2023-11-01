<script setup>
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  title: {
    type: String
  },
  size: {
    type: Number,
    default: 200
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  percent: {
    type: Number,
    default: 0
  },
  showValue: {
    type: Boolean,
    default: true
  },
  valueFormat: {
    type: String,
    default: '${value}%'
  },
  colors: {
    type: Array,
    default: () => ['#36d1dc', '#5b86e5']
  }
})

const uuid = uuidv4()
const color = `url(#${uuid})`

const dashOffset = ref(
  2 * 3.1416 * (props.size / 2 - props.strokeWidth) -
    ((props.percent > 100 ? 100 : props.percent) / 100) *
      2 *
      3.1416 *
      (props.size / 2 - props.strokeWidth)
)

const maxDashOffset = 0
const minDashOffset = 2 * 3.1416 * (props.size / 2 - props.strokeWidth)

// 初始值在0位置
const oldDashOffset = ref(minDashOffset)

// 监听percent变化
watch(
  () => props.percent,
  (od, nd) => {
    oldDashOffset.value = dashOffset.value
    if (od !== nd) {
      dashOffset.value =
        2 * 3.1416 * (props.size / 2 - props.strokeWidth) -
        ((props.percent > 100 ? 100 : props.percent) / 100) *
          2 *
          3.1416 *
          (props.size / 2 - props.strokeWidth)
    }
  }
)
</script>

<template>
  <svg :width="size" :height="size" fill="transparent" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient :id="uuid" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop
          v-for="(color, index) in colors"
          v-bind:key="color"
          :offset="(colors.length > 1 ? (index * 100) / (colors.length - 1) : 0) + '%'"
          :stop-color="color"
        />
      </linearGradient>
    </defs>
    <circle
      :r="size / 2 - strokeWidth"
      :cx="size / 2"
      :cy="size / 2"
      fill="transparent"
      stroke="#f2f5f9"
      stroke-opacity="0.1"
      stroke-linecap="round"
      :stroke-width="strokeWidth + 'px'"
      :stroke-dasharray="2 * 3.1416 * (size / 2 - strokeWidth)"
      :stroke-dashoffset="maxDashOffset"
    />
    <circle
      :r="size / 2 - strokeWidth"
      :cx="size / 2"
      :cy="size / 2"
      fill="transparent"
      :stroke="color"
      stroke-linecap="round"
      :stroke-width="strokeWidth + 'px'"
      :stroke-dasharray="2 * 3.1416 * (size / 2 - strokeWidth)"
      :stroke-dashoffset="dashOffset"
      style="
        transform: rotate(270deg);
        transform-origin: center;
        transition:
          stroke-dashoffset 0.5s ease 0s,
          stroke 0.5s ease 0s,
          opacity 0.5s ease 0s;
      "
    />
    <text
      v-if="showValue"
      :fill="color"
      :x="size / 2"
      :y="size / 2"
      :font-size="(16 / 100) * size"
      style="dominant-baseline: middle; text-anchor: middle"
    >
      {{ valueFormat.replaceAll('${value}', `${percent}`) }}
    </text>
    <text
      :fill="color"
      :x="size / 2"
      :y="size / 2 + (14 / 100) * size"
      :font-size="(12 / 100) * size"
      style="dominant-baseline: middle; text-anchor: middle"
    >
      {{ title }}
    </text>
  </svg>
</template>

<style scoped></style>
