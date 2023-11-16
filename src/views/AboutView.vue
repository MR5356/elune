<template>
  <div class="h-full overflow-y-auto box-border">
    <div class="rounded-lg bg-blue-50 p-4 m-4" v-for="i in 10" :key="i">
      <div class="flex flex-col gap-8 py-4">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 text-sm font-bold items-center">
            <Server theme="outline" size="18" fill="#333" />
            <div>服务器状态</div>
          </div>
          <div class="flex gap-4 justify-items-center">
            <CircularProcessBar :size="88" :percent="percent" title="cpu" />
            <CircularProcessBar :size="88" :percent="percent" title="memory" />
            <CircularProcessBar :size="88" :percent="percent" title="storage" />
            <MultCircularProcessBar :size="88" :percent="fakedata" />
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex gap-2 text-sm font-bold items-center">
            <ApplicationOne theme="outline" size="18" fill="#333" />
            <div>服务状态</div>
          </div>
          <div class="p-4 rounded-3xl">
            <CapsuleChart :data="data" />
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex gap-2 text-sm font-bold items-center">
            <NetworkDrive theme="outline" size="18" fill="#333" />
            <div>集群状态</div>
          </div>
          <div class="p-4 rounded-3xl">
            <CapsuleChart :data="data1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
<script setup>
import CapsuleChart from '@/components/charts/CapsuleChart.vue'
import { ApplicationOne, NetworkDrive, Server } from '@icon-park/vue-next'
import MultCircularProcessBar from '@/components/charts/MultCircularProcessBar.vue'
import CircularProcessBar from '@/components/charts/CircularProcessBar.vue'
import { ref } from 'vue'

const percent = ref(Math.round(Math.random() * 100))
setInterval(() => {
  percent.value = Math.round(Math.random() * 100)
  fakedata.value[0] = Math.round(Math.random() * 100)
  fakedata.value[1] = Math.round(Math.random() * 100)
  fakedata.value[2] = Math.round(Math.random() * 100)
}, 2000)

const fakedata = ref([10, 20, 30])

const data = ref([
  {
    name: 'API',
    value: 100
  },
  {
    name: '前端',
    value: 100
  },
  {
    name: 'redis',
    value: 33
  },
  {
    name: 'postgres',
    value: 100
  }
])

const data1 = ref([
  {
    name: 'master-1',
    value: 100
  },
  {
    name: 'master-2',
    value: 100
  },
  {
    name: 'master-3',
    value: 100
  },
  {
    name: 'node-1',
    value: 100
  },
  {
    name: 'node-2',
    value: 100
  },
  {
    name: 'node-3',
    value: 100
  }
])
</script>
