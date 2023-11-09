<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogDetail } from '@/request/blog'
import numeral from 'numeral'
import moment from 'moment'
import { Eyes, Like } from '@icon-park/vue-next'
import VditorPreview from 'vditor/dist/method.min'
import 'vditor/dist/index.css'

const { params } = useRoute()
const blog = ref({})

onMounted(() => {
  getBlogDetail(params.id).then((res) => {
    res.readTime = Math.ceil(res.content.length / 400)
    res.likes = numeral(res.likes).format('0.0[000]a')
    res.reads = numeral(res.reads).format('0.0[000]a')
    blog.value = res

    VditorPreview.preview(document.getElementById('reader'), res.content, {})
  })
})
</script>

<template>
  <div class="flex w-full justify-center" v-if="blog">
    <div class="flex flex-col 2xl:w-[60%] xl:w-[70%] md:w-[70%] w-full gap-4">
      <div class="flex flex-col gap-2">
        <div class="text-3xl font-bold">{{ blog.title }}</div>
        <div class="py-2 flex flex-col text-gray-500 text-sm rounded gap-2">
          <div class="flex gap-4 items-center">
            <div class="text-black font-medium">{{ blog.author }}</div>
            <div>最后更新于{{ moment(blog.createAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
            <div>阅读{{ blog.readTime }}分钟</div>
            <div class="flex gap-2 items-center">
              <div class="flex gap-1 items-center">
                <Eyes theme="outline" size="16" />
                <div>{{ blog.reads }}</div>
              </div>
              <div class="flex gap-1 items-center">
                <Like theme="outline" size="16" />
                <div>{{ blog.likes }}</div>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <div>标签：</div>
            <div v-for="item in blog.categories" :key="item">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div id="reader" class="w-full"></div>
      <div class="flex gap-2 text-gray-500 text-sm">
        <div>标签：</div>
        <div v-for="item in blog.categories" :key="item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.vditor-toolbar),
:deep(.vditor-content),
:deep(.vditor),
#editor {
  border: none !important;
  &:hover {
    background: white;
  }
}
:deep(.vditor-toolbar) {
  display: none;
}
</style>
