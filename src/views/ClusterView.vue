<script setup>
import { ref } from 'vue'
import withLoading from '@/utils/loading'
import { getConfig } from '@/request/app'

async function aaa() {
  a.value = await withLoading(getConfig, '加载中', 'title')
}
const a = ref(null)
aaa()
</script>

<template>
  <div>{{ a }}</div>
</template>

<style lang="scss"></style>
