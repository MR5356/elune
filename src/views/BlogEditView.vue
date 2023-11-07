<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { markdown2html } from '@/utils/markdown'

const content = ref('')
const preview = ref('')

const refContent = ref()
const refPreview = ref()

function onContentChange() {
  preview.value = markdown2html(content.value)
}

function autoPreviewHeight() {
  refPreview.value.scrollTop =
    (refPreview.value.scrollHeight * refContent.value.textarea.scrollTop) /
    refContent.value.textarea.scrollHeight
}

function autoContentHeight() {
  refContent.value.textarea.scrollTop =
    (refContent.value.textarea.scrollHeight * refPreview.value.scrollTop) /
    refPreview.value.scrollHeight
}

onMounted(() => {
  window.addEventListener('keyup', autoPreviewHeight)
  refContent.value.textarea.addEventListener('scroll', autoPreviewHeight)
  refPreview.value.addEventListener('scroll', autoContentHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', autoPreviewHeight)
  refContent.value.textarea.removeEventListener('scroll', autoPreviewHeight)
  refPreview.value.removeEventListener('scroll', autoContentHeight)
})
</script>

<template>
  <div
    class="flex flex-nowrap flex-col absolute left-0 right-0 top-[60px] bottom-0 bg-white overflow-hidden"
  >
    <div class="p-2 h-[40px]">标题</div>
    <div class="flex" style="height: calc(100vh - 120px)">
      <div class="w-[50%] h-full">
        <el-input
          class="w-full h-full min-w-full min-h-full inputDeep"
          ref="refContent"
          v-model="content"
          type="textarea"
          placeholder="开始写文章"
          autofocus
          @change="onContentChange"
          @input="onContentChange"
        />
      </div>
      <div
        ref="refPreview"
        class="w-[50%] h-full pl-2 pb-2 overflow-y-auto box-border"
        v-html="preview"
      ></div>
    </div>
    <div class="flex justify-between bg-gray-400 text-white text-xs items-center px-2 h-[20px]">
      <div class="flex gap-4">
        <div>Markdown</div>
        <div>{{ content.length }}字数</div>
        <div>{{ content.split('\n').length }}行数</div>
      </div>
      <div class="flex gap-4">
        <div>Html</div>
        <div>{{ preview.length }}字数</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-textarea__inner) {
  box-shadow: 0 0 0 0 var(--el-input-border-color, var(--el-border-color)) inset;
  min-height: 100% !important;
  max-height: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  padding: 8px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 0;
  resize: none;
}
</style>
