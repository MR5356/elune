<script setup>
import { ref } from 'vue'
import { login } from '@/request/app'

const userForm = ref({
  username: '',
  password: ''
})

async function onSubmit() {
  await login(userForm.value)
  history.go(0)
}
</script>

<template>
  <div class="flex flex-col gap-12">
    <div class="w-full text-center text-3xl font-bold text-black">Login</div>
    <el-form label-position="top" :model="userForm" style="max-width: 380px">
      <el-form-item>
        <el-input
          placeholder="username"
          autocomplete="off"
          v-model="userForm.username"
          @keydown.enter="onSubmit"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="password"
          @keydown.enter="onSubmit"
          autocomplete="password"
          type="password"
          v-model="userForm.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="w-full border-0" @click="onSubmit" @keydown.enter="onSubmit"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
  border: 0;
  border-bottom: 1px solid var(--el-border-color);
  border-radius: 0;
  padding: 0;
  box-shadow: 0 0 0 0 var(--el-input-border-color, var(--el-border-color)) inset;
}

:deep(.el-input__inner) {
  padding: 0 10px;
}

:deep(.el-button) {
  border: 0;
  color: white;
  background: #aec0eb;
  background: -webkit-linear-gradient(to right, #f0c4e8, #aec0eb);
  background: linear-gradient(to right, #f0c4e8, #aec0eb);
}
</style>
