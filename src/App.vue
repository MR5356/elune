<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <transition name="el-fade-in">
    <RouterView />
  </transition>
</template>

<style scoped lang="scss"></style>
