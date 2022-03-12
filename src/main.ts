import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { fun } from '@/utils/self-adaption'
import '@/assets/css/style.css'
import '@/assets/iconfont/iconfont.css'

const app = createApp(App)

fun(document, window)

app.use(store).use(router).mount('#app')
