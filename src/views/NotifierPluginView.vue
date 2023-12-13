<script setup>
import { ref } from 'vue'
import withLoading from '@/utils/loading'
import { listNotifierPlugin, deleteNotifierPlugin } from '@/request/devops'
import { ElMessage, ElMessageBox } from 'element-plus'

const notifierPlugins = ref([])

const showUploadPlugin = ref(false)

async function init() {
  notifierPlugins.value = await withLoading(listNotifierPlugin)
}

init()

async function onClickDelete(plugin) {
  ElMessageBox.confirm('即将删除插件，服务重启后生效', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await withLoading(async () => {
      try {
        await deleteNotifierPlugin(plugin)
        ElMessage.success('删除成功，服务重启后生效')
      } catch (error) {
        console.log(error)
      } finally {
        setTimeout(() => {
          init()
        }, 0)
      }
    }, '删除中')
  })
}

const uploadURL = ref(
  window.location.protocol + '//' + window.location.host + '/api/v1/notify/plugin/upload'
)

function onUploadSuccess(res) {
  if (res.code !== 0) {
    ElMessage.error(res.message)
    upload.value.clearFiles()
    return
  }
  upload.value.clearFiles()
  ElMessage.success('插件加载成功')
  showUploadPlugin.value = false
  init()
}

const upload = ref()
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-lg bg-white bg-opacity-0 z-10 mb-4 pr-4 pl-4"
  >
    <div class="font-medium text-xl mb-6">通知插件</div>
    <div class="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div
        class="bg-white bg-opacity-70 rounded-lg shadow p-4 flex items-center justify-between gap-2 sm:p-2 md:p-2 lg:p-4 relative"
        v-for="plugin in notifierPlugins"
        :key="plugin.id"
      >
        <div class="flex flex-col flex-grow">
          <div class="font-bold text-gray-600">{{ plugin.name }}</div>
          <div class="text-xs text-gray-500 line-clamp-1 text-ellipsis max-w-[200px]">
            {{ plugin.status === 'success' ? '已加载' : plugin.status }}
          </div>
          <div class="border-b-[1px] my-2"></div>
          <div class="flex flex-col">
            <div
              class="text-xs grid grid-cols-7"
              v-for="params in plugin.params"
              :key="params.name"
            >
              <div>{{ params.type }}</div>
              <div class="col-span-2">{{ params.name }}</div>
              <div class="col-span-4 line-clamp-1 text-ellipsis">{{ params.desc }}</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col text-xs items-center" v-if="plugin.installed">
          <div class="break-keep font-medium" disabled>
            <el-button
              round
              plain
              type="primary"
              size="small"
              @click="onClickDelete(plugin.id)"
              :disabled="plugin.isBuiltIn"
              >{{ plugin.installed ? '卸载' : '安装' }}</el-button
            >
          </div>
          <div class="text-[0.55rem] text-center text-gray-500">{{ plugin.from }}</div>
        </div>
      </div>
      <div
        class="bg-white bg-opacity-70 rounded-lg shadow p-8 flex flex-col gap-2 sm:p-4 md:p-4 lg:p-6 relative cursor-pointer"
        @click="
          () => {
            ElMessage.warning('生产环境暂不支持上传插件')
            return
            showUploadPlugin = true
          }
        "
      >
        <div class="m-auto flex items-center gap-6">
          <div
            class="h-[2.5rem] w-[2.5rem] min-w-[2.5rem] min-h-[2.5rem] max-w-[2.5rem] max-h-[2.5rem] p-0 rounded-md"
          >
            <img
              class="w-full h-full rounded-md stroke-gray-400"
              src="data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24.0605 10L24.0239 38' stroke='%239da3ae' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10 24L38 24' stroke='%239da3ae' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
              alt="logo"
            />
          </div>
          <div class="text-xl text-gray-400">添加插件</div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="showUploadPlugin"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
      title="上传插件文件"
    >
      <el-upload
        ref="upload"
        :action="uploadURL"
        :limit="1"
        :on-success="onUploadSuccess"
        :auto-upload="true"
        drag
        with-credentials
      >
        <template #trigger>
          <el-button type="info" text>点击选择插件文件或者将文件拖拽到这里</el-button>
        </template>
      </el-upload>
    </el-dialog>
  </div>
</template>

<style scoped></style>
