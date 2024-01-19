<script setup>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { AttachAddon } from 'xterm-addon-attach'
import { FitAddon } from 'xterm-addon-fit'
import { SerializeAddon } from 'xterm-addon-serialize'
import { Unicode11Addon } from 'xterm-addon-unicode11'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { ElNotification } from 'element-plus'
import { onMounted, onUnmounted, ref } from 'vue'

let terminalRef = ref(null)

const props = defineProps({
  uri: String
})

const term = new Terminal({
  screenKeys: true,
  rendererType: 'canvas',
  useStyle: true,
  cursorBlink: true,
  convertEol: true,
  cursorWidth: 2,
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fullscreenWin: true,
  maximizeWin: true,
  screenReaderMode: true,
  fontSize: 16,
  cursorStyle: 'bar',
  allowProposedApi: true,
  rightClickSelectsWord: true
})

const fitAddon = new FitAddon()

let ws = null

const resizeTerm = () => {
  const sendData = JSON.stringify({
    operate: 'resize',
    cols: term.cols,
    rows: term.rows
  })
  ws.send(sendData)
}

const initTerm = () => {
  const attachAddon = new AttachAddon(ws)
  const serializeAddon = new SerializeAddon()
  const unicode11Addon = new Unicode11Addon()
  const webLinksAddon = new WebLinksAddon()
  term.loadAddon(attachAddon)
  term.loadAddon(fitAddon)
  term.loadAddon(serializeAddon)
  term.loadAddon(unicode11Addon)
  term.loadAddon(webLinksAddon)
  term.open(terminalRef.value)
  term.focus()
  term.write('连接中...\n')
  fitAddon.fit()
  resizeTerm()
}

const initSocket = () => {
  const uri = `${location.protocol === 'http:' ? 'ws' : 'wss'}://${window.location.hostname}:${
    window.location.port
  }${props.uri}`
  ws = new WebSocket(uri)

  // 绑定复制粘贴事件
  term.onKey((e) => {
    // ctrl + v paste
    if (e.key === '\x16') {
      navigator.clipboard.readText().then((t) => {
        ws.send(t)
      })

      //ctrol+ c copy
    } else if (e.key === '\x03' && term.hasSelection()) {
      navigator.clipboard.writeText(term.getSelection())
      term.clearSelection()
      e.stop()
    } else {
      ;() => {
        ws.send(e.key)
      }
    }
  })

  ws.onopen = () => {
    initTerm()
  }

  ws.onclose = () => {
    if (term) {
      term.dispose()
    }
  }

  ws.onerror = (err) => {
    if (term) {
      term.dispose()
    }
    console.log('socket err: ', err)
    ElNotification({
      title: '连接出错',
      message: '请检查连接信息是否正确或联系管理员',
      type: 'error',
      duration: 0
    })
    ws.destroy()
    initSocket()
  }

  window.addEventListener(
    'resize',
    () => {
      fitAddon.fit()
      resizeTerm()
    },
    false
  )
}

onMounted(() => {
  initSocket()
})

onUnmounted(() => {
  if (ws) {
    ws.close()
  }

  term.dispose()
})
</script>

<template>
  <div class="h-full w-full bg-black" ref="terminalRef"></div>
</template>

<style>
.xterm {
  padding: 0.25rem;
  box-sizing: border-box;
}
</style>
