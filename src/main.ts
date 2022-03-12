import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { fun } from '@/utils/self-adaption'
// 自定义样式
import '@/assets/css/style.css'
// iconfont 图标样式
import '@/assets/iconfont/iconfont.css'
// elementui 样式
import 'element-plus/dist/index.css'

const app = createApp(App)

fun(document, window)
app.use(store).use(router).mount('#app')
