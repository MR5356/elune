<!--suppress ALL -->
<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { getConfig, setConfig } from '@/request/app'
import { ElLoading } from 'element-plus'
import router from '@/router'

const setting = ref({
  title: '',
  logo: '/logo.svg',
  copyright: 'Copyright © TOODOFUN',
  beian: '',
  beianMiit: '',
  favicon: '/favicon.ico'
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
        setting.value[key] = res
      }
    })
  }
}

initSetting()

const menus = ref([
  {
    title: '首页',
    path: '/'
  },
  {
    title: '博客',
    path: '/blog'
  },
  {
    title: '关于',
    path: '/about'
  }
])

// setConfig('test', '123').then((res) => {
//   console.log(res)
// })

const dialogFormVisible = ref(false)
const newSetting = ref({})

function onOpenDialog() {
  dialogFormVisible.value = true
  newSetting.value = JSON.parse(JSON.stringify(setting.value))
}

async function onSubmitSetting() {
  const loading = ElLoading.service({
    lock: true,
    text: '正在更新',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  for (var key in newSetting.value) {
    if (newSetting.value[key] !== setting.value[key]) {
      await setConfig(key, newSetting.value[key])
      dialogFormVisible.value = false
      initSetting()
      loading.close()
    }
  }
}
</script>

<template>
  <el-container class="w-full">
    <el-header
      class="bg-inherit flex justify-between items-center shadow-md shadow-slate-100 sticky top-0 z-[999] select-none"
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
        >
          <el-menu-item v-for="menu in menus" :key="menu" :index="menu.path">{{
            menu.title
          }}</el-menu-item>
        </el-menu>
      </div>
      <div class="flex gap-2 items-center">
        <el-popover ref="popover" :width="100" trigger="hover" class="p-0" placement="bottom-end">
          <template #reference>
            <img
              src="@/assets/avatar.svg"
              alt="avatar"
              class="w-10 h-10 rounded-full jump"
              title="管理员"
            />
          </template>
          <template #default>
            <div class="flex flex-col gap-0">
              <div class="w-full hover:bg-gray-50 p-2 rounded" @click="onOpenDialog">系统设置</div>
            </div>
          </template>
        </el-popover>
      </div>
      <el-dialog
        v-model="dialogFormVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        class="max-w-[600px] min-w-[420px]"
        title="系统设置"
      >
        <el-form :model="newSetting">
          <el-form-item v-for="(value, key) in newSetting" :key="key" :label="key">
            <el-input v-model="newSetting[key]" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="onSubmitSetting">提交</el-button>
          </span>
        </template>
      </el-dialog>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer class="flex flex-col gap-1 justify-center items-center text-xs">
      <div>{{ setting.copyright }}</div>
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
