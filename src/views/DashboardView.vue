<script setup>
import { ref } from 'vue'
import NumberAnimation from 'vue-number-animation'
import PanelCard from '@/components/common/PanelCard.vue'
import { listMachine, listScript, listCron, listJob, pageCronRecord } from '@/request/devops'
import EluneInfoCard from '@/components/elune/EluneInfoCard.vue'
import router from '@/router'

const sumInfo = ref([
  {
    title: '主机数量',
    total: 0,
    totalFunc: listMachine
  },
  {
    title: '脚本数量',
    total: 0,
    totalFunc: listScript
  },
  {
    title: '计划任务',
    total: 0,
    totalFunc: listCron
  },
  {
    title: '计划任务记录',
    total: 0,
    totalFunc: async () => {
      const res = await pageCronRecord(1, 1)
      return res.total
    }
  },
  {
    title: '脚本历史记录',
    total: 0,
    totalFunc: listJob
  }
])

const recommendedApplication = ref([
  {
    title: '主机管理',
    desc: '管理物理机和虚拟机主机,包括主机监控、终端访问等',
    icon: "data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='19' y='32' width='10' height='9' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Crect x='5' y='8' width='38' height='24' rx='2' fill='%236abaf3' stroke='%23333' stroke-width='2'/%3E%3Cpath d='M22 27H26' stroke='%23FFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 41L34 41' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
    path: '/devops/machine'
  },
  {
    title: '脚本管理',
    desc: '提供脚本管理、远程执行脚本、查看脚本执行日志等功能',
    icon: "data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z' fill='%236abaf3' stroke='%23333' stroke-width='2'/%3E%3Cpath d='M34 33L30 37L34 41' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M40 33L44 37L40 41' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle r='2' transform='matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)' fill='%23FFF'/%3E%3Ccircle r='2' transform='matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)' fill='%23FFF'/%3E%3C/svg%3E",
    path: '/devops/script'
  },
  {
    title: '定时任务管理',
    desc: '管理定时执行的任务,查看任务执行日志',
    icon: "data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 19H43V41C43 42.1046 42.1046 43 41 43H7C5.89543 43 5 42.1046 5 41V19Z' fill='%236abaf3' stroke='%23333' stroke-width='2' stroke-linejoin='round'/%3E%3Cpath d='M5 10C5 8.89543 5.89543 8 7 8H41C42.1046 8 43 8.89543 43 10V19H5V10Z' stroke='%23333' stroke-width='2' stroke-linejoin='round'/%3E%3Cpath d='M16 31L22 37L34 25' stroke='%23FFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M16 5V13' stroke='%23333' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M32 5V13' stroke='%23333' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E",
    path: '/devops/cron/list'
  },
  {
    title: '系统管理员',
    desc: '配置系统参数,管理用户、角色等',
    icon: "data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.2838 43.1713C14.9327 42.1736 11.9498 40.3213 9.58787 37.867C10.469 36.8227 11 35.4734 11 34.0001C11 30.6864 8.31371 28.0001 5 28.0001C4.79955 28.0001 4.60139 28.01 4.40599 28.0292C4.13979 26.7277 4 25.3803 4 24.0001C4 21.9095 4.32077 19.8938 4.91579 17.9995C4.94381 17.9999 4.97188 18.0001 5 18.0001C8.31371 18.0001 11 15.3138 11 12.0001C11 11.0488 10.7786 10.1493 10.3846 9.35011C12.6975 7.1995 15.5205 5.59002 18.6521 4.72314C19.6444 6.66819 21.6667 8.00013 24 8.00013C26.3333 8.00013 28.3556 6.66819 29.3479 4.72314C32.4795 5.59002 35.3025 7.1995 37.6154 9.35011C37.2214 10.1493 37 11.0488 37 12.0001C37 15.3138 39.6863 18.0001 43 18.0001C43.0281 18.0001 43.0562 17.9999 43.0842 17.9995C43.6792 19.8938 44 21.9095 44 24.0001C44 25.3803 43.8602 26.7277 43.594 28.0292C43.3986 28.01 43.2005 28.0001 43 28.0001C39.6863 28.0001 37 30.6864 37 34.0001C37 35.4734 37.531 36.8227 38.4121 37.867C36.0502 40.3213 33.0673 42.1736 29.7162 43.1713C28.9428 40.752 26.676 39.0001 24 39.0001C21.324 39.0001 19.0572 40.752 18.2838 43.1713Z' fill='%236abaf3' stroke='%23333' stroke-width='2' stroke-linejoin='round'/%3E%3Cpath d='M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z' fill='%2343CCF8' stroke='%23FFF' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E",
    path: '/admin/setting'
  }
])

function theFormat(number) {
  if (number < 1000) {
    return number.toFixed(0)
  } else {
    return (number / 1000).toFixed(2) + 'k'
  }
}

async function init() {
  for (const item in sumInfo.value) {
    const res = await sumInfo.value[item].totalFunc()
    if (typeof res === 'number') {
      sumInfo.value[item].total = res
    } else {
      sumInfo.value[item].total = res.length
    }
  }
}

init()
</script>

<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto z-10">
    <div class="grid grid-cols-4 gap-4 pb-4 pr-4">
      <PanelCard title="系统信息" class="bg-white rounded col-span-4">
        <div class="flex justify-between items-center lg:p-4">
          <div
            class="flex flex-col items-center justify-center p-4 gap-4 w-40"
            v-for="item in sumInfo"
            :key="item.title"
          >
            <div class="text-gray-500 font-normal">{{ item.title }}</div>
            <div class="text-2xl text-blue-500 font-bold">
              <NumberAnimation
                :from="0"
                :to="item.total"
                :duration="1"
                :delay="0"
                :format="theFormat"
                autoplay
                easing="linear"
              />
            </div>
          </div>
        </div>
      </PanelCard>
      <PanelCard class="col-span-3 rounded bg-white">
        <div class="w-full flex justify-center">
          <div class="lg:w-[66%]">
            <EluneInfoCard />
          </div>
        </div>
      </PanelCard>
      <PanelCard title="推荐功能" class="col-span-1 rounded bg-white">
        <div class="h-full flex flex-col justify-center items-start">
          <div
            class="flex justify-between items-center p-2 w-full gap-2"
            v-for="app in recommendedApplication"
            :key="app.title"
          >
            <div
              class="w-[2.5rem] h-[2.5rem] min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] bg-slate-100 rounded-lg p-0.5"
            >
              <img class="w-full h-full" :src="app.icon" alt="" />
            </div>
            <div class="grow">
              <div class="text-sm font-bold">{{ app.title }}</div>
              <div class="text-xs text-gray-600">
                {{ app.desc }}
              </div>
            </div>
            <div
              class="text-xs break-keep bg-slate-100 font-medium text-blue-500 py-1 px-3 rounded-full cursor-pointer"
              @click="router.push(app.path)"
            >
              前往
            </div>
          </div>
        </div>
      </PanelCard>
    </div>
  </div>
  <!-- 透明背景层 -->
  <div class="absolute top-0 left-0 right-0 bottom-0 mr-4 mb-4 opacity-0 bg-white rounded-2xl" />
</template>

<style scoped></style>
