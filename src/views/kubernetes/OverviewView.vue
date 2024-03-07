<script setup>
import { ref } from 'vue'
import moment from 'moment'
import PanelCard from '@/components/common/PanelCard.vue'
import CircularProcessBar from '@/components/charts/CircularProcessBar.vue'

const nss = ref([
  {
    name: 'default',
    status: 'Active',
    creationTimestamp: '2023-09-20T06:53:14Z'
  },
  {
    name: 'toodo',
    status: 'Active',
    creationTimestamp: '2023-09-12T06:53:14Z'
  },
  {
    name: '测试中文',
    status: 'Active',
    creationTimestamp: '2023-09-03T06:53:14Z'
  },
  {
    name: 'averylongnamespace',
    status: 'Active',
    creationTimestamp: '2023-08-20T06:53:14Z'
  },
  {
    name: 'hello',
    status: 'Terminating',
    creationTimestamp: '2023-09-22T06:53:14Z'
  }
])
</script>

<template>
  <div
    class="absolute top-0 left-0 right-4 bottom-4 overflow-y-auto z-10 rounded-lg flex flex-col gap-4"
  >
    <PanelCard title="命名空间" class="bg-white">
      <div class="grid grid-cols-4 gap-4">
        <div
          :class="
            (ns.status === 'Active' ? 'bg-sky-100' : 'bg-orange-100') +
            ' p-4 rounded-lg flex flex-col gap-4 relative'
          "
          v-for="ns in nss"
          :key="ns.name"
        >
          <div class="flex gap-2 items-center">
            <div
              class="bg-gray-400 text-white p-1 rounded-full w-[1.5rem] h-[1.5rem] flex justify-center items-center"
            >
              {{ ns.name[0].toUpperCase() }}
            </div>
            <div class="text-sm font-bold text-gray-600">{{ ns.name }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-gray-400 text-sm">
              {{ moment(ns.creationTimestamp).format('YYYY-MM-DD HH:mm:ss') }}
            </div>
            <div class="text-gray-400 text-sm">{{ ns.status }}</div>
          </div>
          <div class="absolute top-2 right-2 w-20 h-20 opacity-20">
            <svg
              t="1706688856505"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4243"
              width="100%"
              height="100%"
            >
              <path
                d="M523.604934 3.077583l431.885568 244.613797a22.669441 22.669441 0 0 1 11.604934 19.768208v489.199149a22.669441 22.669441 0 0 1-11.604934 19.796652l-431.885568 244.585353A23.579632 23.579632 0 0 1 512 1023.998862a23.551189 23.551189 0 0 1-11.604934-2.95812l-431.885568-244.613797A22.669441 22.669441 0 0 1 56.904564 756.687181V267.459588a22.669441 22.669441 0 0 1 11.604934-19.796652L500.395066 3.077583a23.608076 23.608076 0 0 1 23.209868 0zM484.5805 113.807991L153.271023 300.198015l-1.137739 377.131899 147.081156-83.566899-0.540425-186.390025 189.632579 108.796253 1.251512 218.218261-165.882286-94.318529-142.729306 81.575857L511.146696 910.225003l329.090887-188.580171-141.563124-81.120761-163.948131 93.237677 1.279956-218.246705 190.258336-108.142053-1.137739 187.442433 146.682948 82.486048-2.190147-376.022604-331.366364-186.390024 0.938634 160.819349 159.42562 92.327487-188.97838 109.450452-189.632579-109.450452 163.578366-94.432303L484.5805 113.807991z"
                fill="#454646"
                p-id="4244"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </PanelCard>
    <PanelCard title="计算资源" class="bg-white">
      <CircularProcessBar :percent="80" title="就绪节点 4/5" :size="100" />
    </PanelCard>
  </div>
</template>

<style scoped></style>
