<script setup>
import { ref } from 'vue'
import {
  addMessageTemplate,
  deleteMessageTemplate,
  listMessageTemplate,
  updateMessageTemplate
} from '@/request/devops'
import withLoading from '@/utils/loading'
import moment from 'moment/moment'
import MessageTemplateEditor from '@/components/notify/MessageTemplateEditor.vue'
import { ElMessageBox } from 'element-plus'

const messageTemplates = ref([])
async function init() {
  messageTemplates.value = await withLoading(listMessageTemplate)
}
init()

const showMessageTemplateEditor = ref(false)
const newMessageTemplate = ref({})
const isEdit = ref(false)

function onClickShowMessageTemplateEditor(message) {
  newMessageTemplate.value = JSON.parse(JSON.stringify(message))
  isEdit.value = true
  showMessageTemplateEditor.value = true
}

async function onClickDeleteMessageTemplate(id) {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await withLoading(deleteMessageTemplate, '正在删除', id)
    await init()
  })
}

async function onClickSubmitMessageTemplate(message) {
  if (isEdit.value) {
    await withLoading(updateMessageTemplate, '提交中', message)
  } else {
    await withLoading(addMessageTemplate, '提交中', message)
  }
  await init()
  showMessageTemplateEditor.value = false
}
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-lg bg-white bg-opacity-0 z-10 mb-4 pr-4 pl-4"
  >
    <el-table :data="messageTemplates" empty-text="暂无消息模版" style="width: 100%">
      <el-table-column prop="title" label="名称" />
      <el-table-column prop="createdAt" label="创建时间" width="200">
        <template v-slot="scope">
          {{ moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="200">
        <template v-slot="scope">
          {{ moment(scope.row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="168">
        <template v-slot="scope">
          <span class="float-right">
            <el-button
              link
              type="primary"
              size="small"
              disabled
              @click="onClickShowMessageTemplateEditor(scope.row)"
              >编辑</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              disabled
              @click="onClickDeleteMessageTemplate(scope.row.id)"
              >删除</el-button
            >
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="showMessageTemplateEditor"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
      title="消息通道编辑"
    >
      <MessageTemplateEditor
        :message="newMessageTemplate"
        :is-edit="isEdit"
        :on-cancel="
          () => {
            showMessageTemplateEditor = false
          }
        "
        :on-submit="onClickSubmitMessageTemplate"
      />
    </el-dialog>
  </div>
</template>

<style scoped></style>
