<script setup>
import { ref } from 'vue'
import { getNavigation, addNavigation, updateNavigation, deleteNavigation } from '@/request/home'
import { PlusCross } from '@icon-park/vue-next'
import { ElLoading } from 'element-plus'
//
// const keyWords = ref('')
// function handleKeyEvent(event) {
//   console.log(event.key, event.keyCode)
//   // esc
//   if (event.keyCode === 27) {
//     keyWords.value = ''
//     console.log(keyWords.value)
//     return
//   }
//
//   // enter
//   if (event.keyCode === 13) {
//     return
//   }
//
//   // delete
//   if (event.keyCode === 8) {
//     keyWords.value = keyWords.value.substring(0, keyWords.value.length - 1)
//     console.log(keyWords.value)
//     return
//   }
//
//   if (event.keyCode >= 65 && event.keyCode <= 90) {
//     keyWords.value += event.key
//     console.log(keyWords.value)
//   }
//   let queryStringArr = keyWords.value.split('')
//   let str = '(.*?)'
//   let regStr = str + queryStringArr.join(str) + str
//   let reg = RegExp(regStr, 'i')
//   let temp = []
//   console.log(reg)
//   navigationData.value.map((item) => {
//     if (reg.test(item.title) || reg.test(item.desc) || reg.test(item.url)) {
//       temp.push(item)
//     }
//   })
//   console.log(temp)
// }
//
// onMounted(() => {
//   document.addEventListener('keyup', handleKeyEvent)
// })
//
// onBeforeUnmount(() => {
//   document.removeEventListener('keyup', handleKeyEvent)
// })
//
// const highlightKeywords = (result) => {
//   let highlightedResult = result
//   const regex = new RegExp('你好', 'gi')
//   highlightedResult = highlightedResult.replace(regex, `<span style="color: #f20639">你好</span>`)
//   return highlightedResult
// }
//
// console.log(highlightKeywords('你好世界'))

const isEdit = ref(false)
const dialogFormVisible = ref(false)
const categories = ref({
  0: {
    id: 0,
    title: '新建分类',
    order: 0
  }
})
const navigationData = ref([])
const formData = ref({})

function initNavigation() {
  const loading = ElLoading.service({
    lock: true,
    text: 'loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  getNavigation().then((res) => {
    // 按照Order排序
    navigationData.value = res.sort((a, b) => b.order - a.order)
    navigationData.value.forEach((item) => {
      if (item.parent === 0) {
        categories.value[item.id] = item
      }
    })
    loading.close()
  })
  formData.value = {
    id: 0,
    title: '',
    parent: 0,
    href: '',
    logo: '',
    order: 1,
    desc: ''
  }
}

initNavigation()

function submitNavigation() {
  const loading = ElLoading.service({
    lock: true,
    text: '正在更新',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  if (isEdit.value) {
    updateNavigation(formData.value).then(() => {
      dialogFormVisible.value = false
      initNavigation()
      loading.close()
    })
  } else {
    addNavigation(formData.value).then(() => {
      dialogFormVisible.value = false
      initNavigation()
      loading.close()
    })
  }
}

function closeDialog() {
  dialogFormVisible.value = false
  isEdit.value = false
  formData.value = {
    id: 0,
    title: '',
    parent: 0,
    href: '',
    logo: '',
    order: 1,
    desc: ''
  }
}

function addNav() {
  isEdit.value = false
  formData.value = {
    id: 0,
    title: '',
    parent: 0,
    href: '',
    logo: '',
    order: 1,
    desc: ''
  }
  dialogFormVisible.value = true
}

function updateNav(item) {
  formData.value = item
  isEdit.value = true
  dialogFormVisible.value = true
}

function deleteNav(id) {
  const loading = ElLoading.service({
    lock: true,
    text: '正在更新',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  deleteNavigation(id).then(() => {
    initNavigation()
    loading.close()
  })
}

const openPage = (item) => {
  window.open(item.href, '_blank')
}
</script>

<template>
  <div class="flex w-full justify-center">
    <div
      class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 2xl:w-[80%] xl:w-[80%] lg:w-[80%] md:w-full sm:w-full"
    >
      <template v-for="item in navigationData">
        <el-popover
          ref="popover"
          :width="100"
          trigger="contextmenu"
          class="p-0"
          v-if="item.parent !== 0"
          :key="item.id"
        >
          <template #reference>
            <div
              class="bg-slate-50 p-4 flex gap-4 w-full rounded-lg items-center hover:bg-slate-100 cursor-pointer hover:shadow-lg min-w-[220px] jump"
              @click="openPage(item)"
            >
              <img :src="item.logo" alt="logo" class="w-14 h-14 rounded" />
              <div class="flex flex-col gap-1">
                <div class="flex gap-2 items-center">
                  <div class="text-sm font-medium whitespace-nowrap" v-html="item.title"></div>
                  <div
                    class="text-xs bg-slate-100 text-center p-[2px] rounded text-gray-500 w-16 truncate"
                  >
                    {{ categories[item.parent].title }}
                  </div>
                </div>
                <div
                  class="text-xs text-gray-500 line-clamp-1 text-ellipsis"
                  v-html="item.desc"
                ></div>
              </div>
            </div>
          </template>
          <template #default>
            <div class="flex flex-col gap-0">
              <div class="w-full hover:bg-gray-50 p-2 rounded" @click="updateNav(item)">修改</div>
              <div class="w-full hover:bg-gray-50 p-2 rounded" @click="deleteNav(item.id)">
                删除
              </div>
            </div>
          </template>
        </el-popover>
      </template>
    </div>
    <!-- 新增、修改 -->
    <div class="absolute bottom-4 right-4 jump">
      <el-button color="rgb(203 213 225)" @click="addNav" size="large" :icon="PlusCross" circle />
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      class="max-w-[600px] min-w-[420px]"
      :title="isEdit ? '更新菜单' : formData.parent === 0 ? '新增分类' : '新增菜单'"
    >
      <el-form :model="formData">
        <el-form-item label="菜单分类">
          <el-select v-model="formData.parent" placeholder="选择分类">
            <el-option
              v-for="category in categories"
              :key="category"
              :label="category.title"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="formData.parent === 0 ? '分类名称' : '菜单名称'">
          <el-input v-model="formData.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单描述" v-if="formData.parent !== 0">
          <el-input v-model="formData.desc" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单链接" v-if="formData.parent !== 0">
          <el-input v-model="formData.href" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单图标" v-if="formData.parent !== 0">
          <el-input v-model="formData.logo" autocomplete="off" />
          <img v-if="formData.logo" :src="formData.logo" alt="logo" class="w-14 h-14 rounded" />
        </el-form-item>
        <el-form-item :label="formData.parent === 0 ? '分类排序' : '菜单排序'">
          <el-input-number v-model="formData.order" :min="-999" :max="999" :step="1" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitNavigation">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
