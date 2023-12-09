<script setup>
import { ref } from 'vue'
import { addNavigation, deleteNavigation, getNavigation, updateNavigation } from '@/request/home'
import { PlusCross } from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'
import { useSystemStore } from '@/stores/system'
import withLoading from '@/utils/loading'
import { useClipboard } from '@vueuse/core'

const { copy, isSupported } = useClipboard()

function copyText(text) {
  if (!isSupported.value) {
    ElMessage({
      message: '浏览器不支持复制',
      type: 'error'
    })
    return
  }
  copy(text)
  ElMessage({
    message: '复制成功',
    type: 'success'
  })
}

const { userInfo } = useSystemStore()

const keyWords = ref('')

const isEdit = ref(false)
const dialogFormVisible = ref(false)
const categories = ref({})
const selectedCategory = ref('0')

const rawNavigationData = ref([])
const navigationData = ref([])

const formData = ref({})

function filterNavigationData(type, key) {
  if (type === 'category') {
    navigationData.value = rawNavigationData.value.filter((item) => `${item.parent}` === `${key}`)
  } else if (type === 'search') {
    ///
    let queryStringArr = key.split('')
    let str = '(.*?)'
    let regStr = str + queryStringArr.join(str) + str
    let reg = RegExp(regStr, 'i')

    ///
    navigationData.value = rawNavigationData.value.filter((item) => {
      return reg.test(item.title) || reg.test(item.desc) || reg.test(item.href)
    })
  } else {
    navigationData.value = rawNavigationData.value
  }
  // 按照Order排序
  navigationData.value = navigationData.value.sort((a, b) => b.order - a.order)

  // categories.value = {}
  navigationData.value.forEach((item) => {
    if (item.parent === 0) {
      categories.value[item.id] = item
    }
  })
}

async function initNavigation() {
  rawNavigationData.value = await withLoading(getNavigation, '加载中')
  filterNavigationData()
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

async function submitNavigation() {
  if (isEdit.value) {
    await withLoading(updateNavigation, '更新中', formData.value)
    dialogFormVisible.value = false
    await initNavigation()
  } else {
    await withLoading(addNavigation, '添加中', formData.value)
    dialogFormVisible.value = false
    await initNavigation()
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
  console.log(formData.value)
  dialogFormVisible.value = true
}

function updateNav(item) {
  formData.value = item
  isEdit.value = true
  dialogFormVisible.value = true
}

async function deleteNav(id) {
  await withLoading(deleteNavigation, '删除中', id)
  await initNavigation()
  history.go(0)
}

const openPage = (item) => {
  window.open(item.href, '_blank')
}
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="flex flex-col 2xl:w-[80%] xl:w-[80%] lg:w-[90%] md:w-[95%] w-[98%]">
      <!-- 新增、修改 -->
      <div class="fixed bottom-4 right-4 jump z-[999]" v-if="userInfo.value">
        <el-button color="rgb(203 213 225)" @click="addNav" size="large" :icon="PlusCross" circle />
      </div>
      <!-- 标签 -->
      <div class="flex flex-col gap-0 items-start justify-center my-4 w-full">
        <!-- 搜索框 -->
        <div class="flex justify-end w-full">
          <el-input
            v-model="keyWords"
            autofocus
            placeholder="点击开始搜索"
            @keydown.enter="filterNavigationData('search', keyWords)"
            @update:modelValue="filterNavigationData('search', keyWords)"
          />
        </div>
        <!-- 分类 -->
        <div style="max-width: calc(100%)" class="overflow-auto">
          <el-menu
            :default-active="selectedCategory"
            background-color="transparent"
            mode="horizontal"
            :ellipsis="false"
            v-if="categories"
            @select="
              (e) => {
                if (e === '0') {
                  filterNavigationData()
                } else {
                  filterNavigationData('category', e)
                }
              }
            "
          >
            <el-menu-item index="0">全部</el-menu-item>
            <el-menu-item v-for="category in categories" :key="category" :index="`${category.id}`"
              ><el-popover ref="popover" :width="100" trigger="contextmenu" class="p-0">
                <template #reference>{{ category?.title }}</template>
                <template #default>
                  <div class="flex flex-col gap-0">
                    <div class="w-full hover:bg-gray-50 p-2 rounded" @click="updateNav(category)">
                      修改
                    </div>
                    <div
                      class="w-full hover:bg-gray-50 p-2 rounded"
                      @click="deleteNav(category?.id)"
                    >
                      删除
                    </div>
                  </div>
                </template>
              </el-popover></el-menu-item
            >
          </el-menu>
        </div>
      </div>
      <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
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
                <img
                  :src="item.logoData"
                  alt="logo"
                  class="w-14 h-14 rounded"
                  onerror="this.src='data:image/png;base64,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'"
                />
                <div class="flex flex-col gap-1">
                  <div class="flex gap-2 items-center">
                    <div class="text-sm font-medium whitespace-nowrap" v-html="item?.title"></div>
                    <div
                      class="text-xs bg-slate-100 text-center p-[2px] rounded text-gray-500 w-16 truncate"
                    >
                      {{ categories[item.parent]?.title }}
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
              <div class="flex flex-col gap-0 text-sm">
                <div
                  class="w-full hover:bg-gray-50 p-1.5 rounded cursor-pointer"
                  @click="copyText(item.href)"
                >
                  复制链接地址
                </div>
                <div
                  class="w-full hover:bg-gray-50 p-1.5 rounded cursor-pointer"
                  @click="copyText(item.logo)"
                >
                  复制图标地址
                </div>

                <div class="border-b-[1px] border-gray-300 my-1"></div>

                <div
                  class="w-full hover:bg-gray-50 p-1.5 rounded cursor-pointer"
                  @click="updateNav(item)"
                >
                  编辑菜单
                </div>
                <div
                  class="w-full hover:bg-gray-50 p-1.5 rounded cursor-pointer"
                  @click="deleteNav(item.id)"
                >
                  删除菜单
                </div>
              </div>
            </template>
          </el-popover>
        </template>
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
              <el-option label="新增分类" :value="0" />
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
  </div>
</template>

<style scoped lang="scss">
.el-menu {
  border: 0 !important;
}

.el-menu-item {
  border: 0 !important;
  padding: 0 10px !important;
  &.is-active,
  &:hover {
    background: transparent !important;
    color: #0a0a0a !important;
    font-weight: bold !important;
    animation: jump 0.5s;
  }
}
</style>
