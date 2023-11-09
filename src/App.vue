<!--suppress ALL -->
<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { getConfig, login, setConfig } from '@/request/app'
import { ElLoading } from 'element-plus'
import router from '@/router'
import LoginForm from '@/components/system/LoginForm.vue'
import { getUserInfo, logout, getNeedRefreshToken, refreshToken } from '@/request/app'
import { useSystemStore } from '@/stores/system'
import moment from 'moment'
import zhCn from 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { userInfo } = useSystemStore()

getUserInfo().then((res) => {
  userInfo.value = res
  if (res) {
    getNeedRefreshToken().then((res) => {
      if (res && res.need) {
        refreshToken()
      }
    })
  }
})

async function onLogout() {
  await logout()
  history.go(0)
}

const setting = ref({
  title: '',
  logo: '/logo.svg',
  copyright: 'Copyright © TOODOFUN',
  beian: '',
  beianMiit: '',
  favicon: '/favicon.ico',
  menus: []
})

function initSetting() {
  for (const key in setting.value) {
    getConfig(key).then((res) => {
      if (res) {
        if (key === 'title') {
          document.title = res
        }
        if (key === 'favicon') {
          document.querySelector('link[rel="icon"]').href = res
        }
        if (key === 'menus') {
          setting.value[key] = JSON.parse(res)
        } else {
          setting.value[key] = res
        }
      }
    })
  }
}

initSetting()
//
// const menus = ref([
//   {
//     title: '首页',
//     path: '/'
//   },
//   {
//     title: '博客',
//     path: '/blog'
//   },
//   {
//     title: '关于',
//     path: '/about'
//   }
// ])
//
// console.log(JSON.stringify(menus.value))

// setConfig('test', '123').then((res) => {
//   console.log(res)
// })
</script>

<template>
  <el-container class="w-full">
    <el-header
      class="bg-white flex justify-between items-center shadow-md shadow-slate-100 sticky top-0 z-[999] select-none"
    >
      <div class="flex gap-2 items-center font-bold cursor-pointer" @click="router.push('/')">
        <img :src="setting.logo" alt="logo" class="w-10 h-10" />
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
        <el-popover
          ref="popover"
          :width="100"
          trigger="hover"
          class="p-0"
          placement="bottom-end"
          v-if="userInfo.value"
        >
          <template #reference>
            <img
              src="@/assets/avatar.svg"
              alt="avatar"
              class="w-10 h-10 rounded-full jump"
              :title="userInfo.value.username"
            />
          </template>
          <template #default>
            <div class="flex flex-col gap-2">
              <div>
                <div class="w-full text-center font-bold">{{ userInfo.value.username }}</div>
                <div class="w-full text-center text-xs text-gray-400">
                  ({{ moment(userInfo.value.createdAt).fromNow() }})
                </div>
              </div>
              <div>
                <div
                  class="w-full hover:bg-gray-50 p-2 rounded cursor-pointer"
                  @click="router.push('/blog/editor/new')"
                >
                  写文章
                </div>
                <div class="border-b-[1px] border-gray-300 my-1"></div>
                <div
                  class="w-full hover:bg-gray-50 p-2 rounded cursor-pointer"
                  @click="router.push('/setting')"
                >
                  系统设置
                </div>
                <div class="w-full hover:bg-gray-50 p-2 rounded cursor-pointer" @click="onLogout">
                  退出登录
                </div>
              </div>
            </div>
          </template>
        </el-popover>
        <el-popover
          ref="popover"
          :width="280"
          trigger="hover"
          class="p-10"
          placement="bottom-end"
          v-else
        >
          <template #reference>
            <div class="cursor-pointer rounded px-2 py-1 text-sm">登录</div>
          </template>
          <template #default>
            <LoginForm />
          </template>
        </el-popover>
      </div>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer class="flex flex-col gap-1 justify-center items-center text-xs m-4">
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
