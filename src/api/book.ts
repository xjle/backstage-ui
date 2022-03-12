/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Axios from '@/utils/request'

const baseUrl = '/api'

export const getBook = () => Axios.get(`${baseUrl}/book/`)
