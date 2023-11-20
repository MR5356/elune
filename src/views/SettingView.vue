<script setup>
import { ref } from 'vue'
import { getConfig, setConfig, updatePassword } from '@/request/app'
import { ElMessage } from 'element-plus'
import PanelCard from '@/components/common/PanelCard.vue'
import withLoading from '@/utils/loading'

const password = ref('')
const confirmPassword = ref('')
const oldPassword = ref('')

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
  }
  // {
  //   id: 'menus',
  //   name: '菜单',
  //   value: '',
  //   readonly: true,
  //   isImg: false
  // }
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

async function onSubmitUser() {
  // 更新用户信息
  if (password.value !== confirmPassword.value) {
    ElMessage.error({
      message: '两次密码不一致'
    })
    return
  }
  await withLoading(updatePassword, '更新中', {
    password: password.value,
    oldPassword: oldPassword.value
  })
  ElMessage.success('密码修改成功')
  history.go(0)
}
</script>

<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-lg z-10 mb-4 pr-4">
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
        <el-button color="" @click="onSubmitSetting">保存</el-button>
      </PanelCard>
      <PanelCard class="bg-white bg-opacity-70" title="修改密码">
        <el-form :model="newSetting" label-position="top">
          <el-form-item label="原密码">
            <el-input v-model="oldPassword" type="password" autocomplete="new-password" />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="password" type="password" autocomplete="new-password" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="confirmPassword" type="password" autocomplete="new-password" />
          </el-form-item>
        </el-form>
        <el-button color="" @click="onSubmitUser">保存</el-button>
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
