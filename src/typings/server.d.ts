// 请求方式
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/** 后端接口返回的数据结构配置 */
declare namespace FetchResponse {
  interface Request<T = Record<string, unknown>> {
    /** 表示请求路径字段 */
    url: string
    /** 表示请求方式字段 */
    method: RequestMethod
    /** 表示请求参数 */
    params?: T
  }

  interface Response<T = any> {
    /** 表示后端请求状态码的属性字段 */
    code: string
    /** 表示后端消息的属性字段 */
    message: string
    /** 表示后端请求数据的属性字段 */
    result: T
    /** 后端业务上定义的成功请求的状态 */
    status: string | number
  }

  type ContentType =
    | 'text/html'
    | 'text/plain'
    | 'multipart/form-data'
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'application/octet-stream'
    | 'string'

  // 拦截器接口
  interface Interceptor {
    onRequest?: (context: { request: any, options: any }) => void
    onRequestError?: (context: { request: any, options: any, error: any }) => void
    onResponse?: (context: { request: any, options: any, response: any }) => void
    onResponseError?: (context: { request: any, options: any, response: any, error: any }) => void
  }

  // 请求配置接口
  interface RequestConfig {
    baseURL: string
    interceptor?: Interceptor
    headers?: HeadersInit
    timeout?: number
    contentType?: ContentType
  }

  // 请求选项接口
  interface RequestOption<T = Record<string, unknown>> {
    /** 请求路径 */
    url: string
    /** 请求方式 */
    method?: RequestMethod
    /** 请求参数 */
    params?: T
    /** 请求头 */
    headers?: HeadersInit
    /** 请求选项 */
    options?: any // 框架特定选项
    /** 是否获取源数据 */
    isOriginalData?: boolean
    /** 是否需要转换为 blob 数据 */
    isBlob?: boolean
    /** 是否需要转换为 form-data 数据 */
    contentType?: ContentType
  }
}
