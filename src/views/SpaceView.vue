<script setup>
import { ref } from 'vue'
import { updatePassword, updateNickname } from '@/request/app'
import { ElMessage } from 'element-plus'
import PanelCard from '@/components/common/PanelCard.vue'
import withLoading from '@/utils/loading'

const password = ref('')
const confirmPassword = ref('')
const oldPassword = ref('')

const nickname = ref('')

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

async function onSubmitNickname() {
  await withLoading(updateNickname, '更新中', {
    nickname: nickname.value
  })
  history.go(0)
}
</script>

<template>
  <div
    class="bg-blue-50 absolute top-[60px] bottom-0 left-0 right-0 p-8 flex gap-2 justify-center overflow-y-auto"
  >
    <div class="w-[80%] xl:w-[60%]">
      <div class="flex flex-col w-full gap-4">
        <PanelCard class="bg-white bg-opacity-70" title="修改昵称">
          <el-form :model="newSetting" label-position="top">
            <el-form-item label="新的昵称">
              <el-input v-model="nickname" />
            </el-form-item>
          </el-form>
          <el-button class="jump" color="" @click="onSubmitNickname">保存</el-button>
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
          <el-button class="jump" color="" @click="onSubmitUser">保存</el-button>
        </PanelCard>
      </div>
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
