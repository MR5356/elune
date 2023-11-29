<script setup>
import router from '@/router'
import UserInfo from '@/components/system/UserInfo.vue'
import { RouterView } from 'vue-router'
import initSetting from '@/components/system/setting'
import { ref } from 'vue'

defineProps({
  menus: {
    type: Array,
    default: () => []
  }
})

const setting = ref({
  title: '',
  logo: '',
  favicon: '/favicon.ico',
  copyright: '',
  beian: '',
  beianMiit: ''
})
initSetting(setting)
</script>

<template>
  <el-container class="fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg">
    <el-main class="overflow-hidden">
      <el-row class="h-full w-full overflow-hidden">
        <el-col
          :span="3"
          class="border-r-[0px] select-none h-full overflow-y-auto relative flex flex-col"
        >
          <div class="w-full flex items-center h-[60px] p-4 sticky top-0 bg-[#eef6ff]">
            <div class="flex gap-2 items-center font-bold cursor-pointer" @click="router.push('/')">
              <img :src="setting.logo" alt="logo" class="w-8 h-8" />
              <div>{{ setting.title }}</div>
            </div>
          </div>
          <el-menu :default-active="$route.path" router v-if="menus.length > 0" unique-opened>
            <template v-for="menu in menus" :key="menu">
              <el-sub-menu v-if="menu.children" :index="menu.title">
                <template #title>
                  <div class="flex gap-2 items-center">
                    <div v-html="menu.icon" />
                    <span>{{ menu.title }}</span>
                  </div>
                </template>
                <el-menu-item v-for="item in menu.children" :key="item" :index="item.path">
                  <div class="flex gap-2 items-center">
                    <div v-html="item.icon" />
                    <span>{{ item.title }}</span>
                  </div>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="menu.path">
                <div class="flex gap-2 items-center">
                  <div v-html="menu.icon" />
                  <span>{{ menu.title }}</span>
                </div>
              </el-menu-item>
            </template>
          </el-menu>
          <div class="grow" />
          <div
            class="w-full flex flex-col gap-1 items-start p-4 sticky bottom-0 text-xs backdrop-blur-md text-gray-600"
          >
            <div v-if="setting.copyright">{{ setting.copyright }}</div>
            <div class="flex flex-col text-[0.7rem]">
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
          </div>
        </el-col>
        <el-col :span="21" class="h-full">
          <el-header
            class="flex justify-between items-center shadow-none shadow-slate-100 border-b-[0px] border-slate-200 sticky top-0 select-none"
          >
            <div />
            <div class="flex gap-2 items-center">
              <UserInfo />
            </div>
          </el-header>
          <el-main class="relative" style="height: calc(100% - 60px)">
            <RouterView />
          </el-main>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.el-main {
  padding: 0;
}
.el-menu {
  border: 0 !important;
  background: transparent;
}

:deep(.el-menu--inline) {
  background: transparent !important;
}

:deep(.el-sub-menu__title),
.el-menu-item {
  font-size: 0.9rem;
  height: 48px !important;
  color: rgb(75 85 99) !important;
  border: 0 !important;
  background: transparent !important;
  //padding: 0 10px !important;
  &.is-active,
  &:hover {
    background: transparent !important;
    color: #0a0a0a !important;
    font-weight: 600 !important;
    animation: jump 0.5s;
  }
}
.el-col {
  padding: 0;
}

.bg {
  background:
    linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.5)),
    url('/src/assets/background.svg') no-repeat;
  background-size: cover;
}
</style>
