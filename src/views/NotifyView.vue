<script setup>
import { ref } from 'vue'
import withLoading from '@/utils/loading'
import { addNotifierPlugin } from '@/request/devops'

const newNotifierPlugin = ref({
  name: '',
  desc: '',
  file: '',
  fake: ''
})

const uploadURL = ref(
  window.location.protocol + '//' + window.location.host + '/api/v1/notify/plugin/upload'
)
console.log(uploadURL.value)

async function onSubmitNotifierPlugin() {
  await withLoading(addNotifierPlugin, '添加中', newNotifierPlugin.value)
}

function onUploadSuccess(res) {
  newNotifierPlugin.value.file = res.data
  newNotifierPlugin.value.fake = res.data.split('/').pop()
  upload.value.clearFiles()
}

const upload = ref()
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-lg bg-white bg-opacity-0 z-10 mb-4 pr-4 pl-4"
  >
    <el-form :model="newNotifierPlugin">
      <el-form-item label="插件名称">
        <el-input v-model="newNotifierPlugin.name" />
      </el-form-item>
      <el-form-item label="插件描述">
        <el-input v-model="newNotifierPlugin.desc" />
      </el-form-item>
      <el-form-item label="插件文件">
        <el-input v-model="newNotifierPlugin.fake" disabled />
      </el-form-item>
      <el-form-item label="插件文件" style="display: none">
        <el-input v-model="newNotifierPlugin.file" disabled />
      </el-form-item>
      <el-upload
        ref="upload"
        :action="uploadURL"
        :limit="1"
        :on-success="onUploadSuccess"
        :auto-upload="true"
      >
        <template #trigger>
          <el-button type="primary">选择插件文件</el-button>
        </template>
      </el-upload>
    </el-form>
    <el-button @click="onSubmitNotifierPlugin">上传</el-button>
  </div>
</template>

<style scoped></style>
