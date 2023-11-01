<!--suppress ALL -->
<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { getConfig, setConfig } from '@/request/app'
import router from '@/router'

const setting = ref({
  title: '',
  logo: '/logo.svg',
  copyright: 'Copyright © TOODOFUN',
  beian: '',
  beianMiit: '',
  favicon: '/favicon.ico'
})

for (const key in setting.value) {
  getConfig(key).then((res) => {
    if (res) {
      if (key === 'title') {
        document.title = res
      }
      if (key === 'favicon') {
        document.querySelector('link[rel="icon"]').href = res
      }
      setting.value[key] = res
    }
  })
}

// setConfig('test', '123').then((res) => {
//   console.log(res)
// })

const activeIndex = ref('/')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-container class="w-full">
    <el-header
      class="bg-white flex justify-between items-center shadow-md shadow-slate-100 sticky top-0 z-[999]"
    >
      <div class="flex gap-2 items-center font-bold cursor-pointer" @click="router.push('/')">
        <img :src="setting.logo" alt="logo" class="w-10 h-10" />
        <div>{{ setting.title }}</div>
      </div>
      <div>
        <el-menu
          :default-active="activeIndex"
          router
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
        >
          <el-menu-item index="/">导航</el-menu-item>
          <!--          <el-menu-item index="/blog">博客</el-menu-item>-->
        </el-menu>
      </div>
      <div class="flex gap-2 items-center">
        <img src="@/assets/avatar.svg" alt="avatar" class="w-10 h-10 rounded-full" title="管理员" />
      </div>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer class="flex flex-col gap-1 justify-center items-center text-xs">
      <div>{{ setting.copyright }}</div>
      <div class="flex gap-2">
        <a v-if="setting.beianMiit" target="_blank" href="http://www.beian.miit.gov.cn/">{{
          setting.beianMiit
        }}</a>
        <a
          v-if="setting.beian"
          target="_blank"
          :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${setting.beian.replace(
            /[^\d]/g,
            ''
          )}`"
          >{{ setting.beian }}</a
        >
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped lang="scss">
.el-footer {
  height: 48px;
}

.el-menu {
  border: 0 !important;
}

.el-menu-item {
  border: 0 !important;
  padding: 0 10px !important;
  &.is-active,
  &:hover {
    background: inherit !important;
    color: #0a0a0a !important;
    font-weight: bold !important;
    animation: jump 0.5s;
  }
}
</style>
