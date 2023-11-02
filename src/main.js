import './assets/main.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import '@icon-park/vue-next/styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
