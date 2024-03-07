<script setup>
import FrameworkLayout from '@/layouts/FrameworkLayout.vue'

const menus = [
  {
    title: '集群概览',
    path: '/devops/kubernetes'
  },
  {
    title: '控制器',
    children: [
      {
        title: 'Deployments'
      },
      {
        title: 'StatefulSets'
      },
      {
        title: 'DaemonSets'
      },
      {
        title: 'ReplicaSets'
      },
      {
        title: 'CronJobs'
      },
      {
        title: 'Jobs'
      },
      {
        title: 'HPA'
      }
    ]
  },
  {
    title: '公布应用',
    children: [
      {
        title: 'Services'
      },
      {
        title: 'Ingresses'
      }
    ]
  },
  {
    title: '容器组'
  },
  {
    title: '资源配置',
    children: [
      {
        title: 'ConfigMap'
      },
      {
        title: 'Secret'
      }
    ]
  },
  {
    title: '存储'
  },
  {
    title: '事件'
  }
]
</script>

<template>
  <FrameworkLayout :menus="menus" />
</template>

<style scoped></style>
