/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Axios from '@/utils/request'

const baseUrl = '/api'

// 获取验证码
export const getCode = (obj:any) => Axios.post(`${baseUrl}/auto/send/`, obj)

// 登录
export const loginApi = (obj:any) => Axios.post(`${baseUrl}/auto/login/`, obj)

// 注册
export const registerApi = (obj:any) => Axios.post(`${baseUrl}/auto/register/`, obj)

// 获取用户信息
export const userInfoApi = () => Axios.get(`${baseUrl}/auto/`)
