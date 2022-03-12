/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IState } from '@/types/vuex-store'

export default {
  SET_ISLOGIN: (state: IState, payload: boolean) => {
    state.isLogin = payload
  },
  SET_TOKEN: (state: IState, payload: string) => {
    state.token = payload
  },
  SET_USERINFO: (state: IState, payload: any) => {
    state.userInfo = payload
  }
}
