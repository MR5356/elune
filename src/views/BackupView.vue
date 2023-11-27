<script setup>
import { ref } from 'vue'
import { addScript, listScript } from '@/request/devops'
import { getNavigation, addNavigation } from '@/request/home'
import withLoading from '@/utils/loading'
import { saveAs } from 'file-saver'
import PanelCard from '@/components/common/PanelCard.vue'

const refScriptFile = ref(null)
const refNavFile = ref(null)
async function onClickBackupScript() {
  const blob = new Blob([JSON.stringify(await listScript())], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, `script.json`)
}

async function onClickBackupNav() {
  const blob = new Blob([JSON.stringify(await getNavigation())], {
    type: 'text/plain;charset=utf-8'
  })
  saveAs(blob, `nav.json`)
}

async function onClickRestoreScript() {
  await withLoading(async () => {
    const selectedFile = refScriptFile.value.files[0]
    const reader = new FileReader()
    reader.onloadend = async () => {
      if (!reader.result) return
      try {
        const data = JSON.parse(reader.result)
        for (const item of data) {
          await addScript({ title: item.title, desc: item.desc, content: item.content })
        }
      } catch (error) {
        console.log(error)
      } finally {
        refScriptFile.value.value = ''
      }
    }
    reader.readAsText(selectedFile)
  }, '恢复中')
}

async function onClickRestoreNav() {
  await withLoading(async () => {
    const selectedFile = refNavFile.value.files[0]
    const reader = new FileReader()
    reader.onloadend = async () => {
      if (!reader.result) return
      try {
        const data = JSON.parse(reader.result)
        for (const item of data) {
          // await addScript({ title: item.title, desc: item.desc, content: item.content })
          // if (item.id === 1) {
          //   continue
          // }
          try {
            await addNavigation({
              title: item.title,
              parent: item.parent,
              href: item.href,
              logo: item.logo,
              order: item.order,
              desc: item.desc
            })
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        refNavFile.value.value = ''
      }
    }
    reader.readAsText(selectedFile)
  }, '恢复中')
}
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <el-alert
      title="为提供更便捷的备份还原系统的一些配置，临时提供该备份还原功能"
      type="warning"
      show-icon
      :closable="false"
    />
    <PanelCard title="脚本" class="bg-white">
      <div class="flex gap-4 font-medium text-sm">
        <div
          class="bg-blue-100 px-2 py-[1px] rounded-lg text-blue-500 cursor-pointer"
          @click="onClickBackupScript"
        >
          备份脚本
        </div>
        <div>
          <div
            class="bg-blue-100 px-2 py-[1px] rounded-lg text-blue-500 cursor-pointer"
            @click="refScriptFile.click()"
          >
            还原脚本
          </div>
          <input
            type="file"
            id="files"
            ref="refFile"
            style="display: none"
            v-on:change="onClickRestoreScript"
          />
        </div>
      </div>
    </PanelCard>
    <PanelCard title="导航" class="bg-white">
      <div class="flex gap-4 font-medium text-sm">
        <div
          class="bg-blue-100 px-2 py-[1px] rounded-lg text-blue-500 cursor-pointer"
          @click="onClickBackupNav"
        >
          备份导航
        </div>
        <div>
          <div
            class="bg-blue-100 px-2 py-[1px] rounded-lg text-blue-500 cursor-pointer"
            @click="refNavFile.click()"
          >
            还原导航
          </div>
          <input
            type="file"
            id="files"
            ref="refNavFile"
            style="display: none"
            v-on:change="onClickRestoreNav"
          />
        </div>
      </div>
    </PanelCard>
  </div>
</template>

<style scoped></style>
