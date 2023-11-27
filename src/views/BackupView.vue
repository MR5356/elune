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
    <el-alert title="临时提供数据备份，不代表最终品质" type="warning" show-icon :closable="false" />
    <PanelCard title="系统数据备份" class="bg-white">
      <div class="flex gap-4 text-xs text-gray-600">
        <div
          class="px-2 py-[1px] rounded-lg cursor-pointer flex flex-col justify-center items-center"
          @click="onClickBackupScript"
        >
          <div class="h-10 w-10">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          备份脚本
        </div>
        <div>
          <div
            class="px-2 py-[1px] rounded-lg cursor-pointer flex flex-col justify-center items-center"
            @click="refScriptFile.click()"
          >
            <div class="h-10 w-10">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>
            还原脚本
          </div>
          <input
            type="file"
            id="files"
            ref="refScriptFile"
            style="display: none"
            v-on:change="onClickRestoreScript"
          />
        </div>
        <div
          class="px-2 py-[1px] rounded-lg cursor-pointer flex flex-col justify-center items-center"
          @click="onClickBackupNav"
        >
          <div class="h-10 w-10">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          备份导航
        </div>
        <div>
          <div
            class="px-2 py-[1px] rounded-lg cursor-pointer flex flex-col justify-center items-center"
            @click="refNavFile.click()"
          >
            <div class="h-10 w-10">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>
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
