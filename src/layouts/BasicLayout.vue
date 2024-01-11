<script setup>
import { ref } from 'vue'
import router from '@/router'
import UserInfo from '@/components/system/UserInfo.vue'
import { RouterView } from 'vue-router'
import initSetting from '@/components/system/setting'
import { ElNotification } from 'element-plus'

const setting = ref({
  title: '',
  logo: '',
  copyright: 'Copyright © TOODOFUN',
  beian: '',
  beianMiit: '',
  favicon: ''
  // menus: []
})

const menus = ref([
  // {
  //   title: '首页',
  //   path: '/public/nav'
  // },
  // {
  //   title: '飞屏',
  //   path: '/public/screen'
  // }
  // {
  //   title: '博客',
  //   path: '/blog'
  // },
  // {
  //   title: '关于',
  //   path: '/public/elune'
  // }
])

initSetting(setting)
setting.value.menus = menus.value

async function init() {
  ElNotification({
    title: '停机公告',
    message: 'Elune系统升级，将于2023年1月1日停机，敬请谅解',
    type: 'warning',
    duration: 0
  })
}
// init()
</script>

<template>
  <el-container class="w-full">
    <el-header
      class="bg-white flex justify-between items-center shadow-lg shadow-slate-100 sticky top-0 z-[999] select-none"
    >
      <div class="flex gap-2 items-center font-bold cursor-pointer" @click="router.push('/')">
        <img :src="setting.logo" alt="logo" class="w-8 h-8" />
        <div>{{ setting.title }}</div>
      </div>
      <div>
        <el-menu
          :default-active="$route.path"
          background-color="transparent"
          router
          mode="horizontal"
          :ellipsis="false"
          v-if="setting.menus.length > 0"
        >
          <el-menu-item v-for="menu in setting.menus" :key="menu" :index="menu.path">{{
            menu.title
          }}</el-menu-item>
        </el-menu>
      </div>
      <div class="flex gap-2 items-center">
        <UserInfo />
      </div>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer class="flex flex-col gap-1 justify-center items-center text-xs m-4 bg-transparent">
      <div v-if="setting.copyright">{{ setting.copyright }}</div>
      <div class="flex gap-2">
        <a
          v-if="setting.beianMiit"
          class="jump"
          target="_blank"
          href="http://www.beian.miit.gov.cn/"
          >{{ setting.beianMiit }}</a
        >
        <a
          v-if="setting.beian"
          target="_blank"
          class="jump"
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
.el-main {
  padding: 0;
}
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
    background: transparent !important;
    color: #0a0a0a !important;
    font-weight: bold !important;
    animation: jump 0.5s;
  }
}
</style>
