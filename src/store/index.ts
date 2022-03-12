/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 引入模块
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './states'

export default createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer (val: any) {
        const { isLogin, token, userInfo } = val
        return { isLogin, token, userInfo }
      }
    })
  ]
})
