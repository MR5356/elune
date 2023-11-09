<script setup>
import { ref, onMounted } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const editor = ref(null)

function onPublish() {
  console.log(editor.value.getValue())
}

onMounted(() => {
  editor.value = new Vditor('editor', {
    toolbarConfig: {
      hide: false
    },
    toolbar: [
      'bold',
      'italic',
      'headings',
      'strike',
      'link',
      'quote',
      '|',
      'list',
      'ordered-list',
      'table',
      'code',
      'emoji',
      '|',
      'undo',
      'redo',
      '|',
      // 'outline',
      'export',
      '|',
      {
        name: '发布',
        tipPosition: 's',
        tip: '发布文章',
        className: 'right publish',
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.906 6.06267L22.3359 5.1094C23.3436 4.4376 24.6564 4.4376 25.6641 5.1094L27.094 6.06267C32.658 9.77199 36 16.0166 36 22.7037V33H12V22.7037C12 16.0166 15.342 9.77199 20.906 6.06267Z" stroke="#333" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/><circle cx="24" cy="20" r="6" fill="#2F88FF" stroke="#333" stroke-width="3"/><path d="M12 22L6 28.2174V33H42V28.2174L36 22" stroke="#333" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/><path d="M24 38V44" stroke="#333" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/><path d="M16 40V42" stroke="#333" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/><path d="M32 40V42" stroke="#333" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/></svg>',
        click() {
          onPublish()
        }
      }
    ],
    mode: 'wysiwyg',
    // outline: {
    //   enable: true
    // },
    preview: {
      actions: [],
      markdown: {
        toc: true,
        fixTermTypo: true,
        gfmAutoLink: true,
        autoSpace: true,
        paragraphBeginningSpace: true,
        mark: true
      }
    },
    placeholder: '开始写文章',
    counter: {
      enable: true,
      type: 'markdown,text'
    },
    after() {
      editor.value.setValue('')
    }
  })
})
</script>

<template>
  <div id="editor" class="absolute top-[60px] left-0 right-0 bottom-0 m-auto"></div>
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
:deep(.publish) {
  position: relative;
  &::after {
    content: '发布';
    font-size: small;
    display: flex;
    align-items: center;
    position: absolute;
    right: -25px;
    width: fit-content;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
