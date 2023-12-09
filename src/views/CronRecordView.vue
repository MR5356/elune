<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { pageCronRecord } from '@/request/devops'
import withLoading from '@/utils/loading'
import moment from 'moment'

const recordData = ref([])
const pageSize = ref(20)
const pageNum = ref(1)
const pageTotal = ref(10)

const recordInterval = ref(null)
onMounted(() => {
  recordInterval.value = setInterval(async () => {
    await getPage()
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(recordInterval.value)
})

async function init() {
  recordData.value = await withLoading(pageCronRecord, '加载中', pageSize.value, pageNum.value)
  pageTotal.value = recordData.value.total
}

init()

async function getPage() {
  recordData.value = await pageCronRecord(pageSize.value, pageNum.value)
  pageTotal.value = recordData.value.total
}
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-xl bg-white bg-opacity-0 z-10 mb-4 mx-4"
  >
    <el-table :data="recordData?.data" style="width: 100%; height: 100%">
      <el-table-column prop="title" label="任务名称" width="208" />
      <!--      <el-table-column prop="status" label="任务状态" width="128" />-->
      <el-table-column prop="taskName" label="任务执行器" width="128" />
      <el-table-column prop="params" label="任务参数" />
      <el-table-column prop="createdAt" label="开始时间" width="200">
        <template v-slot="scope">
          {{ moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <!--      <el-table-column prop="updatedAt" label="最后更新时间" width="200">-->
      <!--        <template v-slot="scope">-->
      <!--          {{ moment(scope.row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
    <div class="absolute bottom-2 right-2 z-[999]">
      <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next, total"
        :total="pageTotal"
        hide-on-single-page
        @current-change="
          (e) => {
            pageNum = e
            getPage()
          }
        "
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.el-pagination) {
  background: white;
}
</style>
