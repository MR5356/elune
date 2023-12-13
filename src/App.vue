<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <transition name="el-fade-in">
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <div class="fixed top-0 bottom-0 left-0 right-0 bg-red-500"></div>
      </template>
    </Suspense>
  </transition>
</template>

<style scoped lang="scss"></style>
