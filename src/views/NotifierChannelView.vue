<script setup>
import { ref } from 'vue'
import {
  listNotifierChannel,
  addNotifierChannel,
  deleteNotifierChannel,
  listNotifierPlugin,
  sendNotifyTestMessage
} from '@/request/devops'
import withLoading from '@/utils/loading'
import { ElMessage, ElMessageBox } from 'element-plus'
import moment from 'moment'

const channelData = ref([])
async function init() {
  const res = await withLoading(listNotifierChannel)
  channelData.value = res
}
init()

const showAddNotifierChannel = ref(false)
const notifierPlugins = ref([])

async function onClickAddNotifierChannel() {
  showAddNotifierChannel.value = true
  notifierPlugins.value = await withLoading(listNotifierPlugin, '获取通知插件中')
  newNotifierChannel.value = {
    notifierPluginId: notifierPlugins.value[0].id,
    name: '',
    desc: '',
    params: []
  }
}

const newNotifierChannel = ref({
  notifierPluginId: 0,
  name: '',
  desc: '',
  params: []
})
async function onAddNotifierChannel() {
  notifierPlugins.value
    .find((i) => i.id === newNotifierChannel.value.notifierPluginId)
    .params.forEach((p) => {
      if (!p.value) {
        ElMessage.warning(`参数${p.name}的值为空`)
      }
      newNotifierChannel.value.params.push(p.value)
    })
  if (!newNotifierChannel.value.name) {
    ElMessage.error('名称不能为空')
    return
  }
  await withLoading(addNotifierChannel, '正在添加', newNotifierChannel.value)
  ElMessage.success('添加成功')
  showAddNotifierChannel.value = false
  await init()
}

// onAddNotifierChannel()

async function onDeleteNotifierChannel(channel) {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await withLoading(deleteNotifierChannel, '正在删除', channel)
    await init()
  })
}

async function onClickSendTestMessage(id) {
  await withLoading(sendNotifyTestMessage, '发送中', id)
  ElMessage.success('测试消息发送成功')
}
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-lg bg-white bg-opacity-0 z-10 mb-4 pr-4 pl-4"
  >
    <el-table :data="channelData" empty-text="暂无计划任务" style="width: 100%">
      <el-table-column prop="name" label="名称" width="158" />
      <el-table-column prop="desc" label="描述" width="288" />
      <el-table-column prop="params" label="参数">
        <template v-slot="scope">
          {{ scope.row.params.join(',') }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="200">
        <template v-slot="scope">
          {{ moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="168">
        <template #header>
          <el-button
            class="float-right"
            round
            type="primary"
            size="small"
            @click="onClickAddNotifierChannel"
            >添加通道</el-button
          >
        </template>
        <template v-slot="scope">
          <span class="float-right">
            <el-button
              link
              type="danger"
              size="small"
              @click="onDeleteNotifierChannel(scope.row.id)"
              >删除</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="onClickSendTestMessage(scope.row.id)"
              >发送测试通知</el-button
            >
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="showAddNotifierChannel"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
      title="添加消息通道"
    >
      <el-form :model="newNotifierChannel" label-position="top">
        <el-form-item label="消息通道名称">
          <el-input v-model="newNotifierChannel.name" />
        </el-form-item>
        <el-form-item label="消息通道描述">
          <el-input v-model="newNotifierChannel.desc" />
        </el-form-item>
        <el-form-item label="选择通知插件">
          <el-select v-model="newNotifierChannel.notifierPluginId">
            <el-option
              v-for="item in notifierPlugins"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="item in notifierPlugins.find((i) => i.id === newNotifierChannel.notifierPluginId)
            ?.params"
          :key="item.name"
          :label="item.desc"
        >
          <el-input v-model="item.value" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="showAddNotifierChannel = false">取消</el-button>
          <el-button type="primary" @click="onAddNotifierChannel">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
