<script setup>
import { ref } from 'vue'
import { getConfig, setConfig, getUserRole } from '@/request/app'
import { ElLoading } from 'element-plus'
import router from '@/router'

getUserRole().then((res) => {
  if (!res || res.length === 0) {
    router.push('/')
  }
})

const setting = ref([
  {
    id: 'title',
    name: '网站标题',
    value: 'Elune',
    readonly: false,
    isImg: false
  },
  {
    id: 'logo',
    name: '网站图标',
    value: '/logo.svg',
    readonly: false,
    isImg: true
  },
  {
    id: 'copyright',
    name: '版权信息',
    value: '© Elune',
    readonly: false,
    isImg: false
  },
  {
    id: 'beian',
    name: '公安备案号',
    value: '',
    readonly: false,
    isImg: false
  },
  {
    id: 'beianMiit',
    name: '工信部备案号',
    value: '',
    readonly: false,
    isImg: false
  },
  {
    id: 'favicon',
    name: '浏览器图标',
    value: '/favicon.ico',
    readonly: false,
    isImg: true
  },
  {
    id: 'menus',
    name: '菜单',
    value: '',
    readonly: true,
    isImg: false
  }
])

async function initSetting() {
  const loading = ElLoading.service({
    lock: true,
    text: '正在加载',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  for (const index in setting.value) {
    let item = setting.value[index]
    const res = await getConfig(item.id)
    if (res) {
      item.value = res
    }
  }
  newSetting.value = JSON.parse(JSON.stringify(setting.value))
  loading.close()
}

const newSetting = ref()
initSetting()

async function onSubmitSetting() {
  const loading = ElLoading.service({
    lock: true,
    text: '正在更新',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  for (const index in newSetting.value) {
    let item = newSetting.value[index]
    let itemOld = setting.value.find((it) => it.id === item.id)
    if (itemOld.value !== item.value && !item.readonly) {
      await setConfig(item.id, item.value)
    }
  }
  loading.close()
  history.go(0)
}
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="flex flex-col 2xl:w-[80%] xl:w-[80%] md:w-full w-full gap-16">
      <!-- 设置块 -->
      <div>
        <div class="text-sm font-bold border-l-2 pl-2 border-gray-600">网站设置</div>
        <el-form :model="newSetting" class="my-4" label-position="top">
          <el-form-item v-for="item in newSetting" :key="item.id" :label="item.name">
            <div class="flex w-full gap-2 items-center">
              <el-input v-model="item.value" :disabled="item.readonly" autocomplete="off" />
              <img alt="logo" v-if="item.isImg" :src="item.value" class="w-8 h-8" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!--      <div>-->
      <!--        <div class="text-sm font-bold border-l-2 pl-2 border-gray-600">系统设置</div>-->
      <!--      </div>-->

      <el-button color="" @click="onSubmitSetting">保存</el-button>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-form-item__label) {
  font-size: small;
  color: #0a0a0a;
  margin-bottom: 4px !important;
  padding-bottom: 0 !important;
}
:deep(.el-button) {
  border: 0;
  color: white;
  background: #b993d6; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #8ca6db, #b993d6); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #8ca6db,
    #b993d6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
