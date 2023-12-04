<script setup>
import { getConfig } from '@/request/app'
import withLoading from '@/utils/loading'
import router from '@/router'

async function init() {
  const index = await withLoading(getConfig, '加载主页中', 'indexPage')
  await router.push(index)
}
init()
</script>

<template></template>

<style scoped></style>
