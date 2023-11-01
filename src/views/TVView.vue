<script setup>
import { ref, reactive, onMounted } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import videoLanguage from 'video.js/dist/lang/zh-CN.json'

videojs.addLanguage('zh-CN', videoLanguage)

const player = ref()
const video = reactive({
  url: 'https://cntv.sbs/tv?auth=2310201855&id=cctv1'
})

function initVideo() {
  player.value = videojs('aaa', {
    controls: true,
    preload: 'auto',
    autoplay: true,
    loop: false,
    language: 'zh-CN',
    muted: false,
    sources: [
      {
        src: video.url,
        type: 'application/x-mpegURL'
      }
    ],
    userActions: {
      seek: false
    }
  })
}

onMounted(() => {
  initVideo()
})
</script>

<template>
  <div>
    <div>
      <video id="aaa" class="video-js vjs-default-skin video" preload="auto"></video>
    </div>
  </div>
</template>

<style scoped></style>
