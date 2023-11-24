<script setup>
import PanelCard from '@/components/common/PanelCard.vue'
import CircularProcessBar from '@/components/charts/CircularProcessBar.vue'
</script>

<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto z-10">
    <div class="grid grid-cols-4 gap-4 pb-4 pr-4">
      <!--      <PanelCard title="概览" class="col-span-4 bg-white rounded">-->
      <!--        <div class="flex gap-2 justify-items-center">-->
      <!--          <CircularProcessBar :size="88" :percent="9" />-->
      <!--        </div>-->
      <!--      </PanelCard>-->
      <PanelCard title="系统信息" class="bg-white rounded">
        <div class="flex flex-col gap-1 text-sm">
          <div>主机数量 <span class="text-gray-500 ml-4">REL-S231117-R231117</span></div>
          <div>脚本数量 <span class="text-gray-500 ml-4">REL-S231117-R231117</span></div>
          <div>发行版本 <span class="text-gray-500 ml-4">REL-S231117-R231117</span></div>
          <div>发行版本 <span class="text-gray-500 ml-4">REL-S231117-R231117</span></div>
          <div>发行版本 <span class="text-gray-500 ml-4">REL-S231117-R231117</span></div>
        </div>
      </PanelCard>
      <!--      <PanelCard title="状态" class="col-span-4 bg-white rounded">123</PanelCard>-->
    </div>
  </div>
  <!-- 透明背景层 -->
  <div class="absolute top-0 left-0 right-0 bottom-0 mr-4 mb-4 opacity-0 bg-white rounded-2xl" />
</template>

<style scoped></style>
