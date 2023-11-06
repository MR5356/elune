<script setup>
import { ref } from 'vue'
import { getNavigation, addNavigation, updateNavigation, deleteNavigation } from '@/request/home'
import { PlusCross } from '@icon-park/vue-next'
import { ElLoading } from 'element-plus'
import { useSystemStore } from '@/stores/system'

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

function initNavigation() {
  const loading = ElLoading.service({
    lock: true,
    text: 'loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  getNavigation().then((res) => {
    rawNavigationData.value = res
    filterNavigationData()
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
  console.log(formData.value)
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
    history.go(0)
  })
}

const openPage = (item) => {
  window.open(item.href, '_blank')
}
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="flex flex-col 2xl:w-[80%] xl:w-[80%] md:w-full w-full">
      <!-- 新增、修改 -->
      <div class="fixed bottom-4 right-4 jump z-[999]" v-if="userInfo.value">
        <el-button color="rgb(203 213 225)" @click="addNav" size="large" :icon="PlusCross" circle />
      </div>
      <!-- 标签 -->
      <div class="flex gap-2 items-center justify-between my-4 w-full">
        <div style="max-width: calc(100% - 260px)" class="overflow-auto">
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
                <template #reference>{{ category.title }}</template>
                <template #default>
                  <div class="flex flex-col gap-0">
                    <div class="w-full hover:bg-gray-50 p-2 rounded" @click="updateNav(category)">
                      修改
                    </div>
                    <div
                      class="w-full hover:bg-gray-50 p-2 rounded"
                      @click="deleteNav(category.id)"
                    >
                      删除
                    </div>
                  </div>
                </template>
              </el-popover></el-menu-item
            >
          </el-menu>
        </div>
        <!-- 搜索框 -->
        <div>
          <el-input
            v-model="keyWords"
            autofocus
            placeholder="点击开始搜索"
            @keydown.enter="filterNavigationData('search', keyWords)"
            @update:modelValue="filterNavigationData('search', keyWords)"
          />
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
                  :src="item.logo"
                  alt="logo"
                  class="w-14 h-14 rounded"
                  onerror="this.src='/logo.svg'"
                />
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
