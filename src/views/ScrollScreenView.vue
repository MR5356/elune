<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const intervalTime = ref(5000)
const bgColors = ref([
  'bg-red-400',
  'bg-sky-400',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-pink-400',
  'bg-rose-400'
])
const messages = ref([])
const interval = ref(null)
const nextIndex = ref(0)
onMounted(() => {
  interval.value = setInterval(() => {
    nextIndex.value = (nextIndex.value + 1) % messages.value.length
  }, intervalTime.value)
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
})

async function init() {
  messages.value = ['欲饮桂花同载酒<br/>终不似，少年游', '相识虽浅 似是经年']
}
init()
const triggerFullScreen = () => {
  let docElm = document.documentElement
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  } else if (docElm.msRequestFullscreen) {
    docElm = document.body // overwrite the element (for IE)
    docElm.msRequestFullscreen()
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen()
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  }
}
</script>

<template>
  <div
    :class="
      'ease-in-out duration-100 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center ' +
      bgColors[nextIndex % bgColors.length]
    "
    @click="triggerFullScreen"
  >
    <div
      class="ease-in-out duration-1000 text-white font-bold select-none"
      style="font-size: 6vw"
      v-html="messages[nextIndex]"
    ></div>
  </div>
</template>

<style scoped></style>
