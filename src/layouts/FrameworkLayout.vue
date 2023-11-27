<script setup>
import router from '@/router'
import UserInfo from '@/components/system/UserInfo.vue'
import { RouterView } from 'vue-router'
import initSetting from '@/components/system/setting'
import { ref } from 'vue'
import { getUserRole } from '@/request/app'

getUserRole().then((res) => {
  if (!res || res.length === 0) {
    router.push('/')
  }
})

const setting = ref({
  title: '',
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  copyright: '',
  beian: '',
  beianMiit: ''
})
initSetting(setting)
setting.value.menus = [
  // {
  //   title: '概览',
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>`,
  //   path: '/devops'
  // },
  // {
  //   title: '集群管理',
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43 4H5C4.44772 4 4 4.48842 4 5.09091V14.9091C4 15.5116 4.44772 16 5 16H43C43.5523 16 44 15.5116 44 14.9091V5.09091C44 4.48842 43.5523 4 43 4Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M43 32H5C4.44772 32 4 32.4884 4 33.0909V42.9091C4 43.5116 4.44772 44 5 44H43C43.5523 44 44 43.5116 44 42.9091V33.0909C44 32.4884 43.5523 32 43 32Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M14 16V24.0083L34 24.0172V32" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 38H30" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 10H30" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   path: '/devops/cluster'
  // },
  {
    title: '主机管理',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="32" width="10" height="9" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="8" width="38" height="24" rx="2" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M22 27H26" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 41L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    path: '/devops/machine'
  },
  // {
  //   title: '应用商店',
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M28 13L21.5 24L19.875 26.75L19.0625 28.125" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 35L15.8125 33.625" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 29L23 29" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 29H36" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 13L22.5 18.5L23.375 19.875" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 35L29.5 29.5L27.75 26.75L26.875 25.375" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   path: '/devops/apps'
  // },
  // {
  //   title: '备份管理',
  //   path: '/blog',
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 8V20C22 22.2091 17.9706 24 13 24C8.02944 24 4 22.2091 4 20V8" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 14C22 16.2091 17.9706 18 13 18C8.02944 18 4 16.2091 4 14" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 8C22 10.2091 17.9706 12 13 12C8.02944 12 4 10.2091 4 8C4 5.79086 8.02944 4 13 4C17.9706 4 22 5.79086 22 8Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 28V40C44 42.2091 39.9706 44 35 44C30.0294 44 26 42.2091 26 40V28" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 34C44 36.2091 39.9706 38 35 38C30.0294 38 26 36.2091 26 34" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 28C44 30.2091 39.9706 32 35 32C30.0294 32 26 30.2091 26 28C26 25.7909 30.0294 24 35 24C39.9706 24 44 25.7909 44 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 6H38C40.2091 6 42 7.79086 42 10V16" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 42H10C7.79086 42 6 40.2091 6 38V32" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   children: [
  //     {
  //       title: '备份策略',
  //       path: '/devops/about1'
  //     },
  //     {
  //       title: '备份列表',
  //       path: '/blog/backup-list'
  //     },
  //     {
  //       title: '备份插件',
  //       path: '/blog/backup-detail'
  //     }
  //   ]
  // },
  {
    title: '脚本管理',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M34 33L30 37L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 33L44 37L40 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)" fill="#FFF"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)" fill="#FFF"/></svg>`,
    path: '/devops/script'
    // children: [
    //   {
    //     title: '脚本列表',
    //     icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M34 33L30 37L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 33L44 37L40 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)" fill="#FFF"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)" fill="#FFF"/></svg>`,
    //     path: '/devops/script'
    //   },
    //   {
    //     title: '脚本执行器',
    //     icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M34 33L30 37L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 33L44 37L40 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)" fill="#FFF"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)" fill="#FFF"/></svg>`,
    //     path: '/devops/executor'
    //   }
    // ]
  },
  // {
  //   title: '计划任务',
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="28" r="16" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M28 4L20 4" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 4V12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 16L38 13" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 28V22" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 28H18" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   path: '/devops/cron'
  // },
  {
    title: '系统设置',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.2838 43.1713C14.9327 42.1736 11.9498 40.3213 9.58787 37.867C10.469 36.8227 11 35.4734 11 34.0001C11 30.6864 8.31371 28.0001 5 28.0001C4.79955 28.0001 4.60139 28.01 4.40599 28.0292C4.13979 26.7277 4 25.3803 4 24.0001C4 21.9095 4.32077 19.8938 4.91579 17.9995C4.94381 17.9999 4.97188 18.0001 5 18.0001C8.31371 18.0001 11 15.3138 11 12.0001C11 11.0488 10.7786 10.1493 10.3846 9.35011C12.6975 7.1995 15.5205 5.59002 18.6521 4.72314C19.6444 6.66819 21.6667 8.00013 24 8.00013C26.3333 8.00013 28.3556 6.66819 29.3479 4.72314C32.4795 5.59002 35.3025 7.1995 37.6154 9.35011C37.2214 10.1493 37 11.0488 37 12.0001C37 15.3138 39.6863 18.0001 43 18.0001C43.0281 18.0001 43.0562 17.9999 43.0842 17.9995C43.6792 19.8938 44 21.9095 44 24.0001C44 25.3803 43.8602 26.7277 43.594 28.0292C43.3986 28.01 43.2005 28.0001 43 28.0001C39.6863 28.0001 37 30.6864 37 34.0001C37 35.4734 37.531 36.8227 38.4121 37.867C36.0502 40.3213 33.0673 42.1736 29.7162 43.1713C28.9428 40.752 26.676 39.0001 24 39.0001C21.324 39.0001 19.0572 40.752 18.2838 43.1713Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z" fill="#43CCF8" stroke="#FFF" stroke-width="2" stroke-linejoin="round"/></svg>`,
    path: '/devops/setting'
  }
]
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
