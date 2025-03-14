import { ElMessage, ElNotification } from 'element-plus'
import Request from './request'
import { getHeader } from './helpers'
import {
  API_BASE_URL,
  API_HEADERS,
  CONFIRM_ERROR_MSG_CODE,
  ERROR_STATUS,
  REQUEST_TIMEOUT,
} from '~/config'

interface IResponse {
  status: number
  _data: any
}

// 创建请求实例
const Https = new Request({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: API_HEADERS,
  interceptor: {
    onRequest({ options }: { options: any }) {
      options.headers = {
        ...getHeader(),
        ...options.headers,
      }
    },
    onResponse({ response }: { response: IResponse }) {
      if (response.status === 200) {
        const data = response._data
        if (!CONFIRM_ERROR_MSG_CODE.includes(data.code) && ![200, 0].includes(Number(data.code))) {
          ElNotification({
            title: data.message,
            message: h(
              'div',
              {
                style: {
                  'color': '#000',
                  'fontSize': '14px',
                  'white-space': 'pre-wrap',
                },
              },
              JSON.stringify(data.result),
            ),
            duration: 2000,
          })
        }
      }
    },
    onResponseError({ response }: { response: IResponse }) {
      if (response) {
        ElMessage.error(ERROR_STATUS[response?.status as keyof typeof ERROR_STATUS] || '请求失败')
      }
      else {
        ElMessage.error('网络连接失败，请检查您的网络')
      }
      console.error(`HTTP Error response:`, response)
    },
  },
})

export default Https
