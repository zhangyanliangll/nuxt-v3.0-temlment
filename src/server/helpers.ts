import md5 from 'md5'
import { API_VERSION, MD5_KEY } from '~/config'

export function getToken() {
  const token = useCookie('token')
  return token.value
}

export function getHeader() {
  // 请求时间
  const timestamp = new Date().getTime().toString()
  const token = getToken()
  const headers: Record<string, string> = {
    'X-SOURCE-KEY': 'nuxt-website',
    'X-SOURCE-SIGN': md5(`${timestamp}_${MD5_KEY}_${token}`),
    'X-SOURCE-TIME': timestamp,
    'X-SOURCE-VERSION': API_VERSION,
    'X-DEVICE-NETWORK': 'unkown',
    'Authorization': `Bearer ${token}`,
  }
  return headers
}
