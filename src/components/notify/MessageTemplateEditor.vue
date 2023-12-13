<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  onSubmit: {
    type: Function,
    required: true
  },
  onCancel: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <el-form :model="message" label-position="top">
    <el-form-item label="消息模版名称">
      <el-input v-model="message.title" />
    </el-form-item>
    <el-form-item label="消息标题">
      <el-input v-model="message.message.title" />
    </el-form-item>
    <el-form-item label="消息类型">
      <el-select v-model="message.message.type">
        <el-option label="text" value="text" />
        <el-option label="card" value="card" />
      </el-select>
    </el-form-item>
    <el-form-item label="消息通知人">
      <el-select
        v-model="message.message.receiver"
        multiple
        filterable
        default-first-option
        allow-create
      >
      </el-select>
    </el-form-item>
    <el-form-item label="消息级别">
      <el-select v-model="message.message.level">
        <el-option label="info" value="info" />
        <el-option label="warning" value="warning" />
        <el-option label="error" value="error" />
      </el-select>
    </el-form-item>
    <template v-if="message.message.type === 'card'">
      <el-form-item label="消息脚注(支持markdown语法)">
        <el-input v-model="message.message.note.key" />
      </el-form-item>
    </template>
  </el-form>
  <span>
    <el-button @click="onCancel">取消</el-button>
    <el-button type="primary" @click="onSubmit(message)">提交</el-button>
  </span>
</template>

<style scoped></style>
