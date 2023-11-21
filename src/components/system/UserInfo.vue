<script setup>
import router from '@/router'
import moment from 'moment/moment'
import { getUserInfo, logout, getNeedRefreshToken, refreshToken } from '@/request/app'
import { useSystemStore } from '@/stores/system'
import LoginForm from '@/components/system/LoginForm.vue'

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
</script>

<template>
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
        class="w-12 h-12 rounded-full jump bg-sky-100 p-1"
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
          <!--                <div-->
          <!--                  class="w-full hover:bg-gray-50 p-2 rounded cursor-pointer"-->
          <!--                  @click="router.push('/blog/editor/new')"-->
          <!--                >-->
          <!--                  写文章-->
          <!--                </div>-->
          <!--                <div class="border-b-[1px] border-gray-300 my-1"></div>-->
          <div
            class="w-full hover:bg-gray-50 px-2 py-1.5 rounded cursor-pointer"
            @click="router.push('/devops')"
          >
            运维看板
          </div>
          <div
            class="w-full hover:bg-gray-50 px-2 py-1.5 rounded cursor-pointer"
            @click="router.push('/devops/setting')"
          >
            系统设置
          </div>
          <div class="border-b-[1px] border-gray-300 my-1 mx-2"></div>
          <div class="w-full hover:bg-gray-50 px-2 py-1.5 rounded cursor-pointer" @click="onLogout">
            退出登录
          </div>
        </div>
      </div>
    </template>
  </el-popover>
  <el-popover ref="popover" :width="280" trigger="hover" class="p-10" placement="bottom-end" v-else>
    <template #reference>
      <div
        class="cursor-pointer flex items-center justify-center text-sm w-12 h-12 rounded-full jump bg-sky-100 p-1 font-medium text-gray-600"
      >
        登录
      </div>
    </template>
    <template #default>
      <LoginForm />
    </template>
  </el-popover>
</template>

<style scoped></style>
