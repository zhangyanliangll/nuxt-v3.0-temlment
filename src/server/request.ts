import type { AsyncData, UseFetchOptions } from 'nuxt/app'
import { transformRequestData } from './transform'
import { handleFileDownload } from '~/utils/download-file'

/**
 * useFetch请求封装类
 */
class Request {
  private baseURL: string
  private interceptor?: FetchResponse.Interceptor
  private defaultHeaders: HeadersInit
  private timeout?: number
  private defaultContentType: FetchResponse.ContentType

  constructor({
    baseURL,
    interceptor,
    headers,
    timeout,
    contentType = 'application/json',
  }: FetchResponse.RequestConfig) {
    this.baseURL = baseURL
    this.interceptor = interceptor
    this.defaultHeaders = headers || {}
    this.timeout = timeout
    this.defaultContentType = contentType
  }

  // 设置Content-Type头
  private getContentTypeHeader(
    contentType: FetchResponse.ContentType = this.defaultContentType,
  ): Record<string, string> {
    return { 'Content-Type': contentType }
  }

  // 处理请求参数
  private handleRequestParams<T>(
    method: RequestMethod,
    params?: T,
    contentType?: FetchResponse.ContentType,
  ): { query?: T, body?: T } {
    if (!params) return {}

    if (method === 'GET') {
      return { query: params }
    }

    const transformedData = transformRequestData(params, contentType)
    return { body: transformedData }
  }

  // 将拦截器转换为useFetch兼容的格式
  private adaptInterceptorToUseFetch(): Pick<
    UseFetchOptions<any>,
    'onRequest' | 'onRequestError' | 'onResponse' | 'onResponseError'
  > {
    const adapted = {
      onRequest: this.interceptor?.onRequest,
      onRequestError: this.interceptor?.onRequestError,
      onResponse: this.interceptor?.onResponse,
      onResponseError: this.interceptor?.onResponseError,
    }

    // 确保 onResponse 是一个可调用的函数
    if (typeof adapted.onResponse !== 'function') {
      adapted.onResponse = undefined
    }

    return adapted
  }

  // 通用请求方法
  async request<T = any, P = Record<string, unknown>>({
    url,
    method = 'GET',
    params,
    headers,
    options,
    isOriginalData = false,
    isBlob = false,
    contentType,
  }: FetchResponse.RequestOption<P>): Promise<
      AsyncData<FetchResponse.Response<T> | T | Blob | null, Error | null>
    > {
    try {
      const usedContentType = contentType || this.defaultContentType
      const contentTypeHeader = this.getContentTypeHeader(usedContentType)
      const mergedHeaders = { ...this.defaultHeaders, ...contentTypeHeader, ...headers }

      const { query, body } = this.handleRequestParams(method, params, usedContentType)
      const interceptors = this.adaptInterceptorToUseFetch()

      // 处理文件下载的响应拦截
      if (isBlob && import.meta.client) {
        const originalOnResponse = interceptors.onResponse

        interceptors.onResponse = function (context) {
          if (typeof originalOnResponse === 'function') {
            originalOnResponse(context)
          }
          // 处理文件下载
          const response = context.response
          if (response._data instanceof Blob) {
            handleFileDownload(response._data, response.headers)
          }
        }
      }

      const isClient = import.meta.client

      const fetchOptions: UseFetchOptions<FetchResponse.Response<T>> = {
        baseURL: isClient ? this.baseURL : process.env.VITE_DEV_PROXY_IP || '',
        method,
        query,
        body,
        headers: mergedHeaders,
        timeout: this.timeout,
        ...interceptors,
        ...options,
        // 自定义响应处理
        transform: isOriginalData
          ? undefined
          : (response) => {
              return response?.result
            },
      }

      // 处理特殊的Blob响应
      if (isBlob) {
        fetchOptions.responseType = 'blob'
      }

      if (isClient) {
        // 组件挂载后，使用 $fetch
        const { transform, ...rest } = fetchOptions
        const response = await $fetch(url, rest as Record<string, unknown>)
        return {
          data: transform ? ref(transform(response as FetchResponse.Response<T>)) : ref(response),
        } as any
      }

      const response = await useFetch<FetchResponse.Response<T>>(url, fetchOptions)

      return response as unknown as AsyncData<
        FetchResponse.Response<T> | T | Blob | null,
        Error | null
      >
    }
    catch (error) {
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  // HTTP方法封装
  get<T = any, P = Record<string, unknown>>(
    params: Omit<FetchResponse.RequestOption<P>, 'method'>,
  ) {
    const res = this.request<T, P>({ ...params, method: 'GET' })
    return res
  }

  post<T = any, P = Record<string, unknown>>(
    params: Omit<FetchResponse.RequestOption<P>, 'method'>,
  ) {
    return this.request<T, P>({ ...params, method: 'POST' })
  }

  put<T = any, P = Record<string, unknown>>(
    params: Omit<FetchResponse.RequestOption<P>, 'method'>,
  ) {
    return this.request<T, P>({ ...params, method: 'PUT' })
  }

  patch<T = any, P = Record<string, unknown>>(
    params: Omit<FetchResponse.RequestOption<P>, 'method'>,
  ) {
    return this.request<T, P>({ ...params, method: 'PATCH' })
  }

  delete<T = any, P = Record<string, unknown>>(
    params: Omit<FetchResponse.RequestOption<P>, 'method'>,
  ) {
    return this.request<T, P>({ ...params, method: 'DELETE' })
  }

  // 下载文件
  download<P = Record<string, unknown>>(params: Omit<FetchResponse.RequestOption<P>, 'isBlob'>) {
    return this.request<Blob, P>({ ...params, isBlob: true })
  }
}

export default Request
