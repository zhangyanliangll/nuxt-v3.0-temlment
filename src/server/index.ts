import Https from './instance'

type AxiosConfig = Partial<Omit<FetchResponse.RequestOption, 'url' | 'method' | 'params'>>

/**
 * get 请求
 * @param { String } url 请求的url
 * @param { Object } params 请求参数
 * @param { Object } axiosConfig request axiosConfig
 * @returns {Promise<unknown>}
 */
export const get = (
  url: string,
  params?: Record<string, unknown>,
  axiosConfig?: AxiosConfig,
) => {
  return Https.get(
    {
      ...axiosConfig,
      url,
      params,
    },
  )
}

/**
 * post 请求
 * @param { String } url 请求的url
 * @param { Object } data 请求参数
 * @param { Object } axiosConfig request axiosConfig
 * @returns {Promise<unknown>}
 */
export const post = (
  url: string,
  params?: Record<string, unknown>,
  axiosConfig?: AxiosConfig,
) => {
  return Https.post(
    {
      ...axiosConfig,
      url,
      params,
    },
  )
}

/**
 * upload 请求
 * @param { String } url 请求的url
 * @param { Object } data 请求参数
 * @param { Object } axiosConfig request axiosConfig
 * @returns {Promise<unknown>}
 */
export const upload = (
  url: string,
  params?: Record<string, unknown>,
  axiosConfig?: AxiosConfig,
) => {
  return Https.post(
    {
      ...axiosConfig,
      url,
      params,
      contentType: 'multipart/form-data',
    },
  )
}
