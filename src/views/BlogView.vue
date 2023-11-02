<script setup>
import { ref } from 'vue'
import CircularProcessBar from '@/components/charts/CircularProcessBar.vue'
import CapsuleChart from '@/components/charts/CapsuleChart.vue'
import MultCircularProcessBar from '@/components/charts/MultCircularProcessBar.vue'
import { Like, Dislike, ShareOne, Server, ApplicationOne, NetworkDrive } from '@icon-park/vue-next'

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

<template>
  <el-row :gutter="16">
    <el-col :md="24" :lg="18" :xl="18">
      <div class="grid grid-cols-1">
        <div v-for="i in 3" :key="i">
          <div class="p-4 flex gap-4 hover:bg-gray-50 border-b-[1px] border-gray-100">
            <el-image
              style="width: 192px; min-width: 192px; max-width: 192px; height: 108px"
              :src="'https://www.dmoe.cc/random.php?r=' + i"
              fit="contain"
            />
            <div class="flex flex-col gap-2 justify-between">
              <div class="flex flex-col gap-2">
                <div class="font-bold">标题{{ i }}</div>
                <div class="text-sm text-gray-600">
                  简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }} 简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{
                    i
                  }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}简介{{ i }}
                </div>
              </div>
              <div class="flex gap-4 text-sm">
                <div class="flex gap-1 items-center">
                  <Like theme="outline" size="16" fill="#333" />
                  <div>1024</div>
                </div>
                <div class="flex gap-1 items-center">
                  <Dislike theme="outline" size="16" fill="#333" />
                  <div>1024</div>
                </div>
                <div class="flex gap-1 items-center">
                  <ShareOne theme="outline" size="16" fill="#333" />
                  <div>1024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :md="6" :lg="6" :xl="6" class="hidden-md-and-down">
      <div class="flex flex-col gap-8 py-4">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 text-sm font-bold items-center">
            <Server theme="outline" size="18" fill="#333" />
            <div>服务器状态</div>
          </div>
          <div class="grid grid-cols-4 justify-items-center">
            <CircularProcessBar :size="100" :percent="percent" title="cpu" />
            <CircularProcessBar :size="100" :percent="percent" title="memory" />
            <CircularProcessBar :size="100" :percent="percent" title="storage" />
            <MultCircularProcessBar :size="100" :percent="fakedata" />
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
    </el-col>
  </el-row>
</template>

<style scoped></style>
