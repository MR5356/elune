<script setup>
import router from '@/router'
import UserInfo from '@/components/system/UserInfo.vue'
import { RouterView } from 'vue-router'
import initSetting from '@/components/system/setting'
import { ref } from 'vue'

const setting = ref({
  title: '',
  logo: '/logo.svg',
  favicon: '/favicon.ico'
})
initSetting(setting)
setting.value.menus = [
  {
    title: 'Dashboard',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>`,
    path: '/devops'
  },
  {
    title: '备份管理',
    path: '/blog',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 8V20C22 22.2091 17.9706 24 13 24C8.02944 24 4 22.2091 4 20V8" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 14C22 16.2091 17.9706 18 13 18C8.02944 18 4 16.2091 4 14" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 8C22 10.2091 17.9706 12 13 12C8.02944 12 4 10.2091 4 8C4 5.79086 8.02944 4 13 4C17.9706 4 22 5.79086 22 8Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 28V40C44 42.2091 39.9706 44 35 44C30.0294 44 26 42.2091 26 40V28" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 34C44 36.2091 39.9706 38 35 38C30.0294 38 26 36.2091 26 34" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 28C44 30.2091 39.9706 32 35 32C30.0294 32 26 30.2091 26 28C26 25.7909 30.0294 24 35 24C39.9706 24 44 25.7909 44 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 6H38C40.2091 6 42 7.79086 42 10V16" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 42H10C7.79086 42 6 40.2091 6 38V32" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    children: [
      {
        title: '备份策略',
        path: '/blog/backup'
      },
      {
        title: '备份列表',
        path: '/blog/backup-list'
      },
      {
        title: '备份插件',
        path: '/blog/backup-detail'
      }
    ]
  },
  {
    title: '脚本管理',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M34 33L30 37L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 33L44 37L40 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)" fill="#FFF"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)" fill="#FFF"/></svg>`,
    path: '/about',
    children: [
      {
        title: '脚本列表',
        icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M34 33L30 37L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 33L44 37L40 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)" fill="#FFF"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)" fill="#FFF"/></svg>`,
        path: '/about/script'
      }
    ]
  }
]
</script>

<template>
  <el-container class="fixed top-0 bottom-0 left-0 right-0 overflow-hidden">
    <el-header
      class="bg-white flex justify-between items-center shadow-none shadow-slate-100 border-b-[1px] border-slate-200 sticky top-0 z-[999] select-none"
    >
      <div class="flex gap-2 items-center font-bold cursor-pointer" @click="router.push('/')">
        <img :src="setting.logo" alt="logo" class="w-8 h-8" />
        <div>{{ setting.title }}</div>
      </div>
      <div class="flex gap-2 items-center">
        <UserInfo />
      </div>
    </el-header>
    <el-main class="overflow-hidden">
      <el-row class="h-full w-full overflow-hidden">
        <el-col :span="3" class="border-r-[1px] select-none h-full overflow-y-auto">
          <el-menu
            :default-active="$route.path"
            router
            v-if="setting.menus.length > 0"
            unique-opened
          >
            <template v-for="menu in setting.menus" :key="menu">
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
        </el-col>
        <el-col :span="21">
          <RouterView />
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
}

:deep(.el-sub-menu__title),
.el-menu-item {
  font-size: 0.9rem;
  height: 48px !important;
  border: 0 !important;
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
</style>
