<script setup>
import { ref } from 'vue'
import { listCron, enableCron, disableCron, deleteCron } from '@/request/devops'
import moment from 'moment/moment'
import parser from 'cron-parser'
import withLoading from '@/utils/loading'
import { ElMessageBox } from 'element-plus'

const cronData = ref([])

async function onClickEnableCron(id) {
  await withLoading(enableCron, '启用中', id)
  await init()
}

async function onClickDisableCron(id) {
  await withLoading(disableCron, '禁用中', id)
  await init()
}

async function onChangeEnableCron(id, enabled) {
  if (enabled) {
    await onClickEnableCron(id)
  } else {
    await onClickDisableCron(id)
  }
  await init()
}

async function onDeleteCron(id) {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await withLoading(deleteCron, '删除中', id)
    await init()
  })
}

async function init() {
  const res = await withLoading(listCron)
  cronData.value = res.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })
}

init()
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-xl bg-white bg-opacity-0 z-10 mb-4 mx-4"
  >
    <el-table :data="cronData" empty-text="暂无计划任务" style="width: 100%">
      <el-table-column prop="title" label="名称" width="208" />
      <el-table-column prop="taskName" label="任务执行器" width="128" />
      <el-table-column prop="cronString" label="cron表达式" width="128" />
      <el-table-column prop="nextTime" label="下次执行时间" width="188">
        <template v-slot="scope">
          <div class="line-clamp-1 text-ellipsis" :title="scope.row.cronString">
            {{
              scope.row.nextTime === '0001-01-01T00:00:00Z'
                ? '-'
                : moment(scope.row.nextTime).format('YYYY-MM-DD HH:mm:ss')
            }}
          </div>
        </template>
      </el-table-column>
      <!--      <el-table-column prop="desc" label="描述" width="188">-->
      <!--        <template v-slot="scope">-->
      <!--          <div class="line-clamp-1 text-ellipsis" :title="scope.row.desc">-->
      <!--            {{ scope.row.desc }}-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column prop="params" label="任务参数">
        <template v-slot="scope">
          <div class="line-clamp-1 text-ellipsis" :title="scope.row.params">
            {{ scope.row.params }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="200">
        <template v-slot="scope">
          {{ moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="98">
        <template v-slot="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="onChangeEnableCron(scope.row.id, !scope.row.enabled)"
            >{{ scope.row.enabled ? '禁用' : '启用' }}</el-button
          >
          <el-button link type="danger" size="small" @click="onDeleteCron(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
