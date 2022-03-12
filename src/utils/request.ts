/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import store from '../store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css' // Progress 进度条样式

const TIME_OUT = 3000
const BASE_URL = (window as any).BASE_URL ? (window as any).BASE_URL : process.env.VUE_APP_BASE_URL
console.log(BASE_URL)

Nprogress.configure({
  showSpinner: false,
  speed: 600
})

// 创建 axios 实例
const Axios = axios.create({
  // baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})
// 携带cookie
Axios.defaults.withCredentials = true

if (store && store.state) {
  // 请求拦截器
  Axios.interceptors.request.use(
    (config: any) => {
      if (store.state.token) {
        config.headers.token = store.state.token
      }
      Nprogress.start()
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  Axios.interceptors.response.use(
    (response) => {
      store.commit('SET_ISLOGIN', true)
      Nprogress.done()
      return response
    },
    (error) => {
      // 响应错误
      setTimeout(() => {
        Nprogress.done()
      }, 3000)
      return Promise.reject(error)
    }
  )
}

export default Axios
