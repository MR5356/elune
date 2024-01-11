<script setup>
import { ref } from 'vue'
import PanelCard from '@/components/common/PanelCard.vue'
</script>

<template>
  <div class="flex flex-col gap-4">
    <PanelCard class="bg-white mr-4" title="新增镜像迁移配置">
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-2">
          <div class="text-sm">镜像仓库认证配置</div>
          <div></div>
        </div>
        <div class="col-span-2">
          <div class="text-sm">任务执行参数配置</div>
        </div>
        <div class="col-span-4">
          <div class="text-sm">镜像迁移配置</div>
        </div>
      </div>
    </PanelCard>
    <PanelCard class="bg-white mr-4" title="镜像迁移配置列表">bbb</PanelCard>
  </div>
</template>

<style scoped></style>
