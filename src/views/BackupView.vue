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
  const selectedFile = refScriptFile.value.files[0]
  const reader = new FileReader()
  reader.onloadend = async () => {
    if (!reader.result) return
    try {
      const data = JSON.parse(reader.result)
      for (const item of data) {
        await withLoading(async () => {
          await addScript({ title: item.title, desc: item.desc, content: item.content })
        }, `恢复脚本 ${item.title}`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      refScriptFile.value.value = ''
    }
  }
  reader.readAsText(selectedFile)
}

async function onClickRestoreNav() {
  const selectedFile = refNavFile.value.files[0]
  const reader = new FileReader()
  reader.onloadend = async () => {
    if (!reader.result) return
    const data = JSON.parse(reader.result)

    // 恢复分类
    try {
      for (const item of data) {
        try {
          if (item.parent === 0) {
            await withLoading(async () => {
              await addNavigation({
                title: item.title,
                parent: item.parent,
                href: item.href,
                logo: item.logo,
                order: item.order,
                desc: item.desc
              })
            }, `恢复分类 ${item.title}`)
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      refNavFile.value.value = ''
    }
    // 恢复菜单
    const newData = await getNavigation()
    for (const item of data) {
      try {
        if (item.parent !== 0) {
          await withLoading(async () => {
            await addNavigation({
              title: item.title,
              parent: newData.find(
                (i) => i.title === data.find((it) => it.id === item.parent).title
              ).id,
              href: item.href,
              logo: item.logo,
              order: item.order,
              desc: item.desc
            })
          }, `恢复菜单 ${item.title}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  reader.readAsText(selectedFile)
}
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <el-alert title="临时提供的数据备份" type="warning" show-icon :closable="false" />
    <PanelCard title="系统数据备份" class="bg-white">
      <div class="flex gap-4 text-xs text-gray-600">
        <div
          class="px-2 py-[1px] rounded-lg cursor-pointer flex flex-col justify-center items-center"
          @click="onClickBackupScript"
        >
          <div class="h-10 w-10">
            <img
              src="data:image/svg+xml,%3Csvg t='1701151846022' class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' p-id='24779' width='200' height='200'%3E%3Cpath d='M211.1 175.9H697v61.6H211.1z' fill='%23B6F5FF' p-id='24780'%3E%3C/path%3E%3Cpath d='M350.8 758.1H199.9V170.5h508.3v126.6h-14V184.5H213.9v559.6h136.9z' fill='%230F13AE' p-id='24781'%3E%3C/path%3E%3Cpath d='M355.5 301.6h485.9v64H355.5z' fill='%23B6F5FF' p-id='24782'%3E%3C/path%3E%3Cpath d='M206.9 235.6h487.4v14H206.9z' fill='%230F13AE' p-id='24783'%3E%3C/path%3E%3Cpath d='M570.6 215.4v-13.9' fill='%23B6F5FF' p-id='24784'%3E%3C/path%3E%3Cpath d='M563.6 201.5h14v13.9h-14z' fill='%230F13AE' p-id='24785'%3E%3C/path%3E%3Cpath d='M622 215.4v-13.9' fill='%23B6F5FF' p-id='24786'%3E%3C/path%3E%3Cpath d='M615 201.5h14v13.9h-14z' fill='%230F13AE' p-id='24787'%3E%3C/path%3E%3Cpath d='M673.4 215.4v-13.9' fill='%23B6F5FF' p-id='24788'%3E%3C/path%3E%3Cpath d='M666.4 201.5h14v13.9h-14z' fill='%230F13AE' p-id='24789'%3E%3C/path%3E%3Cpath d='M852 882.3H343.8V639.4h14v228.9H838V308.6H357.8v224h-14v-238H852z' fill='%230F13AE' p-id='24790'%3E%3C/path%3E%3Cpath d='M350.8 364.4h490.6v14H350.8z' fill='%230F13AE' p-id='24791'%3E%3C/path%3E%3Cpath d='M714.4 341.1v-13.9' fill='%23B6F5FF' p-id='24792'%3E%3C/path%3E%3Cpath d='M707.4 327.2h14v13.9h-14z' fill='%230F13AE' p-id='24793'%3E%3C/path%3E%3Cpath d='M765.9 341.1v-13.9' fill='%23B6F5FF' p-id='24794'%3E%3C/path%3E%3Cpath d='M758.9 327.2h14v13.9h-14z' fill='%230F13AE' p-id='24795'%3E%3C/path%3E%3Cpath d='M817.3 341.1v-13.9' fill='%23B6F5FF' p-id='24796'%3E%3C/path%3E%3Cpath d='M810.3 327.2h14v13.9h-14z' fill='%230F13AE' p-id='24797'%3E%3C/path%3E%3Cpath d='M468.6 414.4h120.1v14H468.6zM518.3 507.3h120.1v14H518.3zM569.3 461.5h212.1v14H569.3zM528.5 461.5h21.6v14h-21.6zM585.4 564.1h120.1v14H585.4zM518.3 656.9h120.1v14H518.3zM569.3 611.1h212.1v14H569.3zM468.6 713.7h120.1v14H468.6zM518.3 806.6h120.1v14H518.3zM569.3 760.7h212.1v14H569.3zM528.5 760.7h21.6v14h-21.6z' fill='%2349A3FE' p-id='24798'%3E%3C/path%3E%3Cpath d='M235.7 481.5s70 82.9 155.8 81.9v-70.5l110.4 94-112.5 102.3 0.6-67.8s-105.4 0.2-147.5-109.4c-4.7-12.5-6.8-30.5-6.8-30.5z' fill='%23B6F5FF' p-id='24799'%3E%3C/path%3E%3Cpath d='M382.3 705.1l0.7-77.1c-10.3-0.9-30.6-3.8-53.7-13.8-30.1-13-70.7-40.8-93.3-99.8-5-13.2-7.2-31.4-7.3-32.2l-2.7-23.1 15 17.8c0.8 0.9 65.2 75.9 143.5 79.3v-78.5l128 109-130.2 118.4zM247.1 503.3c0.6 2.1 1.3 4.2 2 6.1 16.7 43.5 45.3 74.3 85.2 91.7 30 13.1 55.5 13.2 55.7 13.2h7.1l-0.1 7.1-0.5 51.8 94.7-86.2-92.8-79v62.3l-6.9 0.1c-36.6 0.4-76.1-14.1-114.3-41.9-12.1-9-22.4-17.9-30.1-25.2z' fill='%230F13AE' p-id='24800'%3E%3C/path%3E%3C/svg%3E"
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
                src="data:image/svg+xml,%3Csvg t='1701151904954' class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' p-id='1655' width='200' height='200'%3E%3Cpath d='M650.8 208.5c0-31-25.4-56.4-56.4-56.4H164c31 0 56.4 25.4 56.4 56.4v374.3c0 31 25.4 56.4 56.4 56.4s56.4-25.4 56.4-56.4V366c0-30.9 25.2-56.2 56-56.3h-0.3 261.9V208.5z' fill='%23B6F5FF' p-id='1656'%3E%3C/path%3E%3Cpath d='M859.4 858.5h-361v-0.1c-33.2-2-59.5-29.6-59.5-63.3v-429c0-27.2-22.1-49.4-49.4-49.4s-49.4 22.1-49.4 49.4v216.8c0 34.9-28.4 63.4-63.4 63.4-32.9 0-60-25.2-63.1-57.3h-0.3V282.5H100.7v-73.9c0-34.9 28.4-63.4 63.4-63.4s63.4 28.4 63.4 63.4V583c0 27.2 22.1 49.4 49.4 49.4s49.4-22.1 49.4-49.4V366.1c0-34.9 28.4-63.4 63.4-63.4s63.4 28.4 63.4 63.4v429c0 27.2 22.1 49.4 49.4 49.4s49.4-22.1 49.4-49.4v-38.6h371.2v38.6c-0.3 35-28.8 63.4-63.7 63.4z m-317.5-14h317.5c27.2 0 49.4-22.1 49.4-49.4v-24.6H565.6v24.6c0 20-9.3 37.8-23.7 49.4z m-427.2-576h98.7v-59.9c0-27.2-22.1-49.4-49.4-49.4s-49.4 22.1-49.4 49.4v59.9zM657.8 309.8h-14V208.5c0-27.2-22.1-49.4-49.4-49.4h-31.6v-14h31.6c34.9 0 63.4 28.4 63.4 63.4v101.3z' fill='%230F13AE' p-id='1657'%3E%3C/path%3E%3Cpath d='M868.3 759.9h-14V366.2c0-27.2-22.1-49.4-49.4-49.4h-31.6v-14h31.6c34.9 0 63.4 28.4 63.4 63.4v393.7zM276.8 632.3h169.1v14H276.8z' fill='%230F13AE' p-id='1658'%3E%3C/path%3E%3Cpath d='M501.7 378.2H610v14H501.7zM350.4 244.3h215.4v14H350.4zM565.1 490.6h108.3v14H565.1zM501.7 546.9H610v14H501.7zM619.3 659.3H791v14H619.3zM565.1 434.4h227.2v14H565.1zM565.1 603.1h227.2v14H565.1zM294.4 194.3h14v11.6h-14zM337.5 194.3h14v11.6h-14zM380.5 194.3h14v11.6h-14z' fill='%2349A3FE' p-id='1659'%3E%3C/path%3E%3Cpath d='M694 388.3v-11.6' fill='%23B6F5FF' p-id='1660'%3E%3C/path%3E%3Cpath d='M687 376.7h14v11.6h-14z' fill='%2349A3FE' p-id='1661'%3E%3C/path%3E%3Cpath d='M737.1 388.3v-11.6' fill='%23B6F5FF' p-id='1662'%3E%3C/path%3E%3Cpath d='M730.1 376.7h14v11.6h-14z' fill='%2349A3FE' p-id='1663'%3E%3C/path%3E%3Cpath d='M780.1 388.3v-11.6' fill='%23B6F5FF' p-id='1664'%3E%3C/path%3E%3Cpath d='M773.1 376.7h14v11.6h-14z' fill='%2349A3FE' p-id='1665'%3E%3C/path%3E%3Cpath d='M592.2 671.6V661' fill='%23B6F5FF' p-id='1666'%3E%3C/path%3E%3Cpath d='M585.2 661h14v10.6h-14z' fill='%2349A3FE' p-id='1667'%3E%3C/path%3E%3Cpath d='M388.9 309.8h412.7' fill='%23B6F5FF' p-id='1668'%3E%3C/path%3E%3Cpath d='M388.9 302.8h412.7v14H388.9z' fill='%230F13AE' p-id='1669'%3E%3C/path%3E%3Cpath d='M164 152.2h406.2' fill='%23B6F5FF' p-id='1670'%3E%3C/path%3E%3Cpath d='M164 145.2h406.2v14H164z' fill='%230F13AE' p-id='1671'%3E%3C/path%3E%3C/svg%3E"
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
              src="data:image/svg+xml,%3Csvg t='1701152270909' class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' p-id='1959' width='200' height='200'%3E%3Cpath d='M784.4 682.1H148.6c-5 0-9-4-9-9V244.5c0-5 4-9 9-9h635.8c5 0 9 4 9 9v428.6c0 4.9-4 9-9 9z m-630.8-14h625.8V249.5H153.6v418.6z' fill='%230F13AE' p-id='1960'%3E%3C/path%3E%3Cpath d='M148.1 605.3h642v14h-642zM615.6 806.5H317.4v-57.7h118.3v14H331.4v29.7h270.2v-29.7H495v-14h120.6z' fill='%230F13AE' p-id='1961'%3E%3C/path%3E%3Cpath d='M401.2 680.7h14v75.1h-14zM517.8 680.7h14v75.1h-14zM334.1 434.2H196.4V308.3H334v125.9z m-123.7-14H320v-97.9H210.4v97.9zM580.5 548.7H198.4v-57.2h382.1v57.2z m-368.1-14h354.1v-29.2H212.4v29.2z' fill='%230F13AE' p-id='1962'%3E%3C/path%3E%3Cpath d='M557.3 308.3h25.1v14h-25.1zM367.9 308.3h171.6v14H367.9zM367.9 358.8h101.8v14H367.9zM490.8 358.8h99.7v14h-99.7zM464.9 413.8h125.7v14H464.9zM417 413h25.1v14H417zM365.2 413h25.1v14h-25.1z' fill='%2349A3FE' p-id='1963'%3E%3C/path%3E%3Cpath d='M898.6 755.8H635.8c-1.1 0-2-0.9-2-2v-394c0-1.1 0.9-2 2-2h262.7c1.1 0 2 0.9 2 2v394c0.1 1.1-0.8 2-1.9 2z' fill='%23B6F5FF' p-id='1964'%3E%3C/path%3E%3Cpath d='M898.6 762.8H635.8c-5 0-9-4-9-9v-394c0-5 4-9 9-9h262.7c5 0 9 4 9 9v394c0.1 4.9-4 9-8.9 9z m-257.8-14h252.7v-384H640.8v384z' fill='%230F13AE' p-id='1965'%3E%3C/path%3E%3Cpath d='M861.4 710.1H673V400.9h188.3v309.2z m-174.4-14h160.3V414.9H687v281.2z' fill='%230F13AE' p-id='1966'%3E%3C/path%3E%3Cpath d='M718.7 535.9l35.7 35.7 61.2-61.3' fill='%23B6F5FF' p-id='1967'%3E%3C/path%3E%3Cpath d='M754.4 581.5l-40.6-40.6 9.9-9.9 30.7 30.7 56.3-56.3 9.9 9.9z' fill='%230F13AE' p-id='1968'%3E%3C/path%3E%3C/svg%3E"
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
                src="data:image/svg+xml,%3Csvg t='1701152238619' class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' p-id='1810' width='200' height='200'%3E%3Cpath d='M839.7 654H163.9V220.4c0-4.4 3.6-8 8-8h659.8c4.4 0 8 3.6 8 8V654z m-661.8-14h647.8V226.4H177.9V640z' fill='%230F13AE' p-id='1811'%3E%3C/path%3E%3Cpath d='M805 613H198.6V247.6H805V613z m-592.4-14H791V261.6H212.6V599zM85.1 740.6h833.5v14H85.1z' fill='%230F13AE' p-id='1812'%3E%3C/path%3E%3Cpath d='M875.3 795.8H123c-12.5 0-24.1-6.8-30.2-17.8l-16.6-29.8L163.4 644l10.7 9-80.9 96.9 11.9 21.4c3.6 6.5 10.5 10.6 17.9 10.6h752.3c6.4 0 12.6-3.1 16.4-8.2l18.2-24.3-80.4-96.4 10.7-9 87.6 104.8L903 782c-6.5 8.7-16.9 13.8-27.7 13.8z' fill='%230F13AE' p-id='1813'%3E%3C/path%3E%3Cpath d='M209.5 692.3h59.9v14h-59.9zM314.4 692.3h59.9v14h-59.9zM419.4 692.3h59.9v14h-59.9zM524.3 692.3h59.9v14h-59.9zM629.2 692.3h59.9v14h-59.9zM734.2 692.3h59.9v14h-59.9z' fill='%230F13AE' p-id='1814'%3E%3C/path%3E%3Cpath d='M487.7 443.8h32v14h-32zM245.7 443.8h219.2v14H245.7zM245.7 490.7h130.1v14H245.7zM402.7 490.7h127.5v14H402.7zM369.5 541.9h160.6v14H369.5zM318.1 541.1H355v14h-36.9zM241.7 541.1h36.9v14h-36.9z' fill='%2349A3FE' p-id='1815'%3E%3C/path%3E%3Cpath d='M367.2 404.4H244.7V298.7h122.4v105.7z m-108.5-14h94.4v-77.7h-94.4v77.7z' fill='%2349A3FE' p-id='1816'%3E%3C/path%3E%3Cpath d='M526.7 404.4H404.2V298.7h122.4v105.7z m-108.5-14h94.4v-77.7h-94.4v77.7z' fill='%2349A3FE' p-id='1817'%3E%3C/path%3E%3Cpath d='M741.6 365.3m-168.2 0a168.2 168.2 0 1 0 336.4 0 168.2 168.2 0 1 0-336.4 0Z' fill='%23B6F5FF' p-id='1818'%3E%3C/path%3E%3Cpath d='M741.6 540.6c-96.6 0-175.2-78.6-175.2-175.2S645 190.2 741.6 190.2s175.2 78.6 175.2 175.2-78.6 175.2-175.2 175.2z m0-336.5c-88.9 0-161.2 72.3-161.2 161.2s72.3 161.2 161.2 161.2c88.9 0 161.2-72.3 161.2-161.2s-72.3-161.2-161.2-161.2z' fill='%230F13AE' p-id='1819'%3E%3C/path%3E%3Cpath d='M729.3 427.9l-72-72 9.9-9.9 62.1 62.1 100.5-100.4 9.9 9.9z' fill='%230F13AE' p-id='1820'%3E%3C/path%3E%3C/svg%3E"
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
