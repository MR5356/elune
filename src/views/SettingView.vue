<script setup>
import { ref } from 'vue'
import { getConfig, setConfig, restartServer } from '@/request/app'
// import { ElMessage } from 'element-plus'
import PanelCard from '@/components/common/PanelCard.vue'
import withLoading from '@/utils/loading'
import { ElMessageBox } from 'element-plus'

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
    id: 'indexPage',
    name: '网站首页',
    value: '/public/nav',
    readonly: false,
    isImg: false
  }
])

const notification = ref([
  {
    title: '停机公告',
    message: 'Elune系统升级，将于2023年1月1日停机，敬请谅解',
    type: 'warning',
    duration: 0
  },
  {
    title: '停机公告2',
    message: 'Elune系统升级，将于2023年1月1日停机，敬请谅解',
    type: 'warning',
    duration: 0
  }
])

async function initSetting() {
  await withLoading(async () => {
    for (const index in setting.value) {
      let item = setting.value[index]
      const res = await getConfig(item.id)
      if (res) {
        item.value = res
      }
    }
  }, '加载中')

  newSetting.value = JSON.parse(JSON.stringify(setting.value))
}

const newSetting = ref()
initSetting()

async function onSubmitSetting() {
  // 更新系统设置
  await withLoading(async () => {
    for (const index in newSetting.value) {
      let item = newSetting.value[index]
      let itemOld = setting.value.find((it) => it.id === item.id)
      if (itemOld.value !== item.value && !item.readonly) {
        await setConfig(item.id, item.value)
      }
    }
  }, '更新中')

  history.go(0)
}

async function onClickRestartServer() {
  ElMessageBox.confirm('重启Elune服务', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await withLoading(restartServer, '重启中')
    setTimeout(() => {
      window.location.reload()
    })
  })
}
</script>

<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-lg z-10 mb-4 px-4">
    <div class="font-medium text-xl mb-6">系统设置</div>
    <div class="flex flex-col w-full gap-4">
      <!-- 设置块 -->
      <PanelCard class="bg-white bg-opacity-70" title="网站设置">
        <el-form :model="newSetting" label-position="top">
          <el-form-item v-for="item in newSetting" :key="item.id" :label="item.name">
            <div class="flex w-full gap-2 items-center">
              <el-input v-model="item.value" :disabled="item.readonly" autocomplete="off" />
              <img alt="logo" v-if="item.isImg" :src="item.value" class="w-8 h-8" />
            </div>
          </el-form-item>
        </el-form>
        <el-button class="jump" color="" @click="onSubmitSetting">保存</el-button>
      </PanelCard>
      <!--      <PanelCard class="bg-white bg-opacity-70" title="网站公告">-->
      <!--        <div class="grid grid-cols-4 gap-4">-->
      <!--          <div class="bg-sky-100 p-2 rounded-lg" v-for="(item, index) in notification" :key="index">-->
      <!--            <el-form :model="newSetting" label-position="top">-->
      <!--              <el-form-item label="消息标题">-->
      <!--                <el-input v-model="item.title" autocomplete="off" />-->
      <!--              </el-form-item>-->
      <!--              <el-form-item label="消息正文">-->
      <!--                <el-input v-model="item.message" autocomplete="off" />-->
      <!--              </el-form-item>-->
      <!--              <el-form-item label="消息级别">-->
      <!--                <el-input v-model="item.type" autocomplete="off" />-->
      <!--              </el-form-item>-->
      <!--              <el-form-item label="自动关闭">-->
      <!--                <el-input v-model="item.duration" autocomplete="off" />-->
      <!--              </el-form-item>-->
      <!--            </el-form>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <el-button class="jump mt-2" color="">保存</el-button>-->
      <!--      </PanelCard>-->
      <PanelCard class="bg-white bg-opacity-70" title="系统操作">
        <el-button class="jump" color="" @click="onClickRestartServer">重启服务</el-button>
      </PanelCard>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-form-item__label) {
  font-size: 0.75rem;
  color: rgba(75, 85, 99, 0.7);
  margin-bottom: 2px !important;
  padding-bottom: 0 !important;
}
:deep(.el-form-item) {
  margin-bottom: 8px;
}
:deep(.el-input__inner) {
  font-size: 0.8rem;
}
:deep(.el-button) {
  border: 0;
  color: white;
  font-size: 0.8rem;
  padding: 6px 10px;
  height: fit-content;
  background: #b993d6; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #8ca6db, #b993d6); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #8ca6db,
    #b993d6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
