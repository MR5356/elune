<script setup>
import { Like, Dislike, ShareOne } from '@icon-park/vue-next'
</script>

<template>
  <el-row :gutter="16">
    <el-col :md="24" :lg="18" :xl="18">
      <div class="grid grid-cols-1">
        <div v-for="i in 3" :key="i">
          <div
            class="p-4 flex gap-4 hover:bg-gray-50 border-b-[1px] border-gray-100 cursor-pointer jump"
          >
            <el-image
              style="width: 192px; min-width: 192px; max-width: 192px; height: 108px"
              :src="'https://www.dmoe.cc/random.php?r=' + i"
              fit="cover"
              v-if="i % 2 === 1"
            />
            <div class="flex flex-col gap-2 justify-between">
              <div class="flex flex-col gap-2">
                <div class="font-bold">周秦行纪</div>
                <div class="text-sm text-gray-600 line-clamp-3">
                  共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年
                  共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年
                </div>
              </div>
              <div class="flex gap-4 text-sm">
                <div class="flex gap-1 items-center">
                  <Like theme="outline" size="16" fill="#333" />
                  <div>{{ Math.round(Math.random() * 10000) }}</div>
                </div>
                <div class="flex gap-1 items-center">
                  <Dislike theme="outline" size="16" fill="#333" />
                  <div>{{ Math.round(Math.random() * 10000) }}</div>
                </div>
                <div class="flex gap-1 items-center">
                  <ShareOne theme="outline" size="16" fill="#333" />
                  <div>{{ Math.round(Math.random() * 10000) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :md="24" :lg="6" :xl="6">
      <div class="flex flex-col gap-8 py-4">
        <div class="">
          <div class="text-sm font-bold">文章推荐</div>
          <div class="py-2">
            <div
              v-for="i in 3"
              :key="i"
              class="flex gap-2 hover:bg-gray-50 border-b-[1px] border-gray-100 items-center p-2 cursor-pointer jump"
            >
              <el-image
                style="width: 66px; min-width: 66px; max-width: 66px; height: 37px"
                :src="'https://www.dmoe.cc/random.php?r=' + i"
                fit="cover"
                v-if="i % 2 === 1"
              />
              <div class="flex flex-col gap-1 justify-between">
                <div class="flex flex-col gap-0">
                  <div class="text-sm font-bold">周秦行纪</div>
                  <div class="text-xs text-gray-600 line-clamp-2">
                    共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年共道人间惆怅事，不知今夕是何年
                  </div>
                </div>
                <div class="flex gap-4 text-xs">
                  <div class="flex gap-1 items-center">
                    <Like theme="outline" size="12" fill="#333" />
                    <div>{{ Math.round(Math.random() * 10000) }}</div>
                  </div>
                  <div class="flex gap-1 items-center">
                    <Dislike theme="outline" size="12" fill="#333" />
                    <div>{{ Math.round(Math.random() * 10000) }}</div>
                  </div>
                  <div class="flex gap-1 items-center">
                    <ShareOne theme="outline" size="12" fill="#333" />
                    <div>{{ Math.round(Math.random() * 10000) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped></style>
