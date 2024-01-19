<script setup>
import { ref } from 'vue'
import withLoading from '@/utils/loading'
import { listApplications } from '@/request/devops'

const applications = ref([])
async function init() {
  const apps = await withLoading(listApplications, '获取应用列表')
  applications.value = apps.sort((a, b) => b.order - a.order)
}

init()

const keyWords = ref('')
function filterAppsData() {
  console.log('search')
}

const openPage = (item) => {
  window.open(item, '_blank')
}
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-lg bg-white bg-opacity-0 z-10 mb-4 px-4"
  >
    <div class="font-medium text-xl mb-6">应用市场</div>
    <!--搜索-->
    <div class="flex justify-end w-full mb-4">
      <el-input
        v-model="keyWords"
        autofocus
        disabled
        placeholder="搜索应用（暂不可用）"
        @keydown.enter="filterAppsData('search', keyWords)"
        @update:modelValue="filterAppsData('search', keyWords)"
      />
    </div>
    <!--展示区域-->
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div
        class="bg-white bg-opacity-50 rounded-2xl shadow shadow-sky-100 p-8 flex gap-4 sm:p-4 md:p-4 lg:p-6 jump"
        v-for="app in applications"
        :key="app.id"
      >
        <div
          class="h-[3.5rem] w-[3.5rem] min-w-[3.5rem] min-h-[3.5rem] max-w-[3.5rem] max-h-[3.5rem] p-2 rounded-md bg-sky-50"
        >
          <img class="w-full h-full rounded-md" :src="app.logo" alt="logo" />
        </div>
        <div class="flex flex-col gap-6 grow">
          <div class="flex flex-col gap-1">
            <div class="font-medium text-sm text-gray-600">{{ app.title }}</div>
            <div class="text-sm text-gray-500">
              {{ app.desc }}
            </div>
            <div class="flex gap-2 text-xs mt-1">
              <div
                class="px-2 bg-sky-200 text-gray-500 rounded-full"
                v-for="tag in app.os"
                :key="tag"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col text-xs items-center">
          <div
            class="break-keep bg-slate-100 font-medium text-blue-500 py-1 px-3 rounded-full cursor-pointer"
            @click="openPage(app.link)"
          >
            获取
          </div>
          <div class="text-[0.55rem] text-center text-gray-500">{{ app.note }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
