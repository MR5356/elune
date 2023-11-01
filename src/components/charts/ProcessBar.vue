<script setup>
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  percent: {
    type: Number,
    default: 0
  },
  colors: {
    type: Array,
    default: () => ['#36d1dc', '#5b86e5']
  },
  strokeWidth: {
    type: Number,
    default: 8
  },
  showValue: {
    type: Boolean,
    default: false
  },
  valueFormat: {
    type: String,
    default: '${value}%'
  },
  fontColor: {
    type: String,
    default: '#000'
  }
})
const oldProcess = ref(props.percent)

const uuid = uuidv4()
const color = `url(#${uuid})`

const line = ref(null)

watch(
  () => props.percent,
  (od, nd) => {
    if (od !== nd) {
      oldProcess.value = props.percent
    }
  }
)
</script>

<template>
  <div class="flex items-center gap-2">
    <svg :height="strokeWidth">
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
      <g>
        <rect
          width="100%"
          rx="4"
          :height="strokeWidth"
          fill="#f2f5f9"
          stroke="#f2f5f9"
          stroke-opacity="0.1"
          style="opacity: 0.1"
          ref="line"
        />
        <rect
          :width="'calc(100% * ' + (percent > 100 ? 1 : percent / 100) + ')'"
          rx="4"
          :height="strokeWidth"
          :fill="color"
          style="
            transition:
              width 0.5s ease 0s,
              stroke 0.5s ease 0s,
              opacity 0.5s ease 0s;
          "
        ></rect>
      </g>
    </svg>
    <div class="text-sm" v-if="showValue" :style="{ color: fontColor }">
      {{ valueFormat.replaceAll('${value}', `${percent}`) }}
    </div>
  </div>
</template>

<style scoped></style>
