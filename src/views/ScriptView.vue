<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import router from '@/router'
import { ElMessageBox } from 'element-plus'
import { Instruction } from '@icon-park/vue-next'
import {
  listScript,
  deleteScript,
  addScript,
  updateScript,
  startNewJob,
  listMachine,
  listMachineGroup,
  listJob,
  stopJob,
  getJobLog
} from '@/request/devops'
import moment from 'moment'
import withLoading from '@/utils/loading'
import { PlusCross } from '@icon-park/vue-next'
import { useRoute } from 'vue-router'

const { query } = useRoute()

const activeTab = ref(query.tab || 'script')
const tableData = ref()
const rawTableData = ref()
const showDrawer = ref(false)
const recordData = ref([])

const script = ref({})
const isEdit = ref(false)
const logView = ref({})
const showLogView = ref(false)
const showRunScript = ref(false)
const searchKey = ref('')

const logInterval = ref()
const recordInterval = ref()
const isRecord = ref(false)

onMounted(() => {
  recordInterval.value = setInterval(async () => {
    if (isRecord.value) {
      recordData.value = await listJob()
    }
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(recordInterval.value)
})

async function onClickStopJob(id) {
  await withLoading(stopJob, '停止中', id)
}

function onSearchScript() {
  let queryStringArr = searchKey.value.split('')
  let str = '(.*?)'
  let regStr = str + queryStringArr.join(str) + str
  let reg = RegExp(regStr, 'i')
  tableData.value = rawTableData.value.filter((item) => {
    return reg.test(item.title) || reg.test(item.desc)
  })
}

async function onShowAddScript() {
  showDrawer.value = true
  isEdit.value = false
  script.value = {
    title: '',
    desc: '',
    content: ''
  }
}

async function onAddOrUpdateScript() {
  if (isEdit.value) {
    await withLoading(updateScript, '更新中', {
      id: script.value.id,
      title: script.value.title,
      desc: script.value.desc,
      content: script.value.content
    })
  } else {
    await withLoading(addScript, '添加中', script.value)
  }
  showDrawer.value = false
  await init()
}

async function onDeleteScript(row) {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await withLoading(deleteScript, '删除中', row.id)
    await init()
  })
}

function onTabChange(e) {
  if (e === 'script') {
    isRecord.value = false
    router.replace({ query: { tab: 'script' } })
    init()
  } else {
    isRecord.value = true
    router.replace({ query: { tab: 'record' } })
    initRecord()
  }
}

async function initRecord() {
  recordData.value = await withLoading(listJob)
}

async function init() {
  rawTableData.value = await withLoading(listScript)
  onSearchScript()
}

async function onShowRecordLog(id) {
  logView.value = await withLoading(getJobLog, '查询中', id)
  showLogView.value = true
  await nextTick(() => {
    logInterval.value = setInterval(async () => {
      logView.value = await getJobLog(id)
    }, 1000)
  })
}

function onCloseLogView() {
  clearInterval(logInterval.value)
  showLogView.value = false
}

const runScript = ref({})
async function onShowRunScript(row) {
  showRunScript.value = true
  runScript.value = {
    scriptId: row.id,
    machineIds: [],
    machineGroupId: null,
    params: '',
    title: row.title,
    type: 'machine',
    ms: await listMachine(),
    mgs: await listMachineGroup()
  }
}

async function onSubmitRunScript() {
  await withLoading(startNewJob, '提交任务', {
    scriptId: runScript.value.scriptId,
    machineIds: runScript.value.machineIds,
    machineGroupId: runScript.value.machineGroupId || 0,
    params: runScript.value.params
  })
  await initRecord()
  showRunScript.value = false
  activeTab.value = 'record'
  await router.replace({ query: { tab: 'record' } })
}

function onRunScriptTabChange(e) {
  if (e === 'machine') {
    runScript.value.machineGroupId = null
  } else {
    runScript.value.machineIds = []
  }
}

if (query.tab === 'record') {
  isRecord.value = true
  initRecord()
} else {
  isRecord.value = false
  init()
}
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-xl bg-white bg-opacity-0 z-10 mb-4 mr-4"
  >
    <el-tabs v-model="activeTab" @tab-change="onTabChange">
      <el-tab-pane label="脚本管理" name="script">
        <div class="fixed bottom-8 right-8 jump z-[999]">
          <el-button
            color="rgb(203 213 225)"
            @click="onShowAddScript"
            size="large"
            :icon="PlusCross"
            circle
          />
        </div>
        <el-table :data="tableData" empty-text="暂无脚本" style="width: 100%; height: 100%">
          <el-table-column fixed prop="id" label="ID" width="66" />
          <el-table-column prop="type.title" label="类型" width="88">
            <template v-slot="scope">
              <div class="flex items-center gap-2">
                <Instruction
                  theme="multi-color"
                  size="18"
                  :fill="['#333', '#6abaf3', '#FFF', '#43CCF8']"
                  :strokeWidth="2"
                />
                <div class="font-medium">{{ scope.row.type.title }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="名称" width="166">
            <template v-slot="scope">
              <div class="font-bold line-clamp-1 text-ellipsis" :title="scope.row.title">
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="描述" width="166">
            <template v-slot="scope">
              <div class="line-clamp-1 text-ellipsis" :title="scope.row.desc">
                {{ scope.row.desc }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="预览">
            <template v-slot="scope">
              <div class="line-clamp-1 text-ellipsis" :title="scope.row.content">
                {{ scope.row.content }}
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="" width="138">
            <template #header>
              <el-input
                v-model="searchKey"
                size="small"
                placeholder="搜索脚本"
                clearable
                @keydown.enter="onShowRunScript"
                @update:modelValue="onSearchScript"
              />
            </template>
            <template v-slot="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="
                  () => {
                    script = scope.row
                    showDrawer = true
                    isEdit = true
                  }
                "
                >编辑</el-button
              >
              <el-button link type="primary" size="small" @click="onDeleteScript(scope.row)"
                >删除</el-button
              >
              <el-button link type="primary" size="small" @click="onShowRunScript(scope.row)"
                >运行</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-drawer v-model="showDrawer" :with-header="false" :z-index="999">
          <div class="z-[999] w-full h-full flex flex-col justify-between">
            <el-form :model="script" label-position="top">
              <el-form-item label="名称">
                <el-input v-model="script.title" />
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="script.desc" />
              </el-form-item>
              <el-form-item label="脚本">
                <el-input v-model="script.content" type="textarea" :rows="10" />
              </el-form-item>
            </el-form>
            <div class="flex justify-end">
              <el-button link type="primary" @click="showDrawer = false">关闭</el-button>
              <el-button link type="primary" @click="onAddOrUpdateScript">提交</el-button>
            </div>
          </div>
        </el-drawer>
        <el-dialog
          v-model="showRunScript"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false"
          class="max-w-[600px] min-w-[420px]"
          title="执行脚本"
        >
          <el-form :model="script" label-position="top">
            <el-form-item label="脚本名称">
              <el-input v-model="runScript.title" readonly disabled />
            </el-form-item>
            <el-form-item label="脚本参数">
              <el-input v-model="runScript.params" type="textarea" :rows="3" />
            </el-form-item>
            <el-tabs v-model="runScript.type" @tab-change="onRunScriptTabChange">
              <el-tab-pane label="选择机器" name="machine">
                <el-form-item label="">
                  <el-select v-model="runScript.machineIds" multiple default-first-option>
                    <el-option
                      v-for="m in runScript.ms"
                      :key="m.id"
                      :label="`${m.title}: ${m.hostInfo?.username}@${m.hostInfo.host}:${m.hostInfo.port}`"
                      :value="m.id"
                    />
                  </el-select>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="选择机器组" name="machineGroup">
                <el-form-item label="">
                  <el-select v-model="runScript.machineGroupId" default-first-option>
                    <el-option
                      v-for="m in runScript?.mgs"
                      :key="m.id"
                      :label="`${m.title}`"
                      :value="m.id"
                    />
                  </el-select>
                </el-form-item>
                <div class="flex gap-2 flex-wrap">
                  <div
                    class="bg-blue-100 rounded-full px-2 py-1 text-xs text-gray-500"
                    v-for="m in runScript.mgs?.find((i) => i.id === runScript.machineGroupId)
                      ?.machines"
                    :key="m.id"
                  >
                    {{ m.title }}: {{ m.hostInfo.username }}@{{ m.hostInfo.host }}:{{
                      m.hostInfo.port
                    }}
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-form>
          <template #footer>
            <span>
              <el-button @click="showRunScript = false">取消</el-button>
              <el-button type="primary" @click="onSubmitRunScript">提交</el-button>
            </span>
          </template>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="执行记录" name="record">
        <el-table :data="recordData" empty-text="暂无记录" style="width: 100%; height: 100%">
          <el-table-column fixed prop="id" label="ID" width="320" />
          <el-table-column prop="status" label="状态" width="80" />
          <el-table-column prop="scriptTitle" label="脚本名称" width="180" />
          <el-table-column prop="script" label="脚本内容">
            <template v-slot="scope">
              <div class="line-clamp-1 text-ellipsis" :title="scope.row.script">
                {{ scope.row.script }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="script" label="执行机器">
            <template v-slot="scope">
              <div class="line-clamp-1 text-ellipsis" :title="scope.row.host">
                {{ scope.row.host }}
              </div>
            </template>
          </el-table-column>
          <!--          <el-table-column prop="result" label="结果">-->
          <!--            <template v-slot="scope">-->
          <!--              <div class="line-clamp-1 text-ellipsis" :title="scope.row.result">-->
          <!--                {{ scope.row.result }}-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column prop="createdAt" label="执行时间" width="166">
            <template v-slot="scope">
              {{ moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="" width="98">
            <template v-slot="scope">
              <div class="text-right">
                <el-button
                  link
                  :type="scope.row.status !== 'running' ? 'info' : 'danger'"
                  size="small"
                  @click="onClickStopJob(scope.row.id)"
                  :disabled="scope.row.status !== 'running'"
                >
                  停止</el-button
                >
                <el-button link type="primary" size="small" @click="onShowRecordLog(scope.row.id)"
                  >日志</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          v-model="showLogView"
          :close-on-click-modal="true"
          :close-on-press-escape="true"
          :show-close="true"
          :before-close="onCloseLogView"
          class="min-w-[50%] h-[66%] overflow-y-auto"
          title="日志"
          id="logView"
        >
          <div class="flex flex-col gap-0 p-0 m-0">
            <el-collapse accordion>
              <el-collapse-item
                v-for="(logs, host) in logView"
                :key="host"
                :title="host"
                :name="host"
              >
                <div v-for="(log, index) in logs" :key="index" class="">
                  <span class="tabular-nums"></span> {{ log }}
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
:deep(.el-dialog__header) {
  padding: 1rem;
}
:deep(.el-dialog__body) {
  padding: 0 1rem 1rem 1rem;
}
</style>
