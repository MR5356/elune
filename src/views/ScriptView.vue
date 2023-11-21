<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { Instruction } from '@icon-park/vue-next'
import { listScript, deleteScript, addScript, updateScript } from '@/request/devops'
import withLoading from '@/utils/loading'
import { PlusCross } from '@icon-park/vue-next'

const tableData = ref()
const showDrawer = ref(false)

const script = ref({})
const isEdit = ref(false)

// addScript({ title: '测试', content: 'aaa' })

async function onShowAddScript() {
  showDrawer.value = true
  isEdit.value = false
  script.value = {
    title: '',
    desc: '',
    content: ''
  }
  // await withLoading(addScript, '添加中', script.value)
  // await init()
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

async function init() {
  tableData.value = await withLoading(listScript)
}
init()
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-xl bg-white bg-opacity-0 z-10 mb-4 mr-4"
  >
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
          <el-button link type="primary" size="small">运行</el-button>
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
  </div>
</template>

<style scoped></style>
