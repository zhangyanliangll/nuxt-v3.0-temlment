import type { NitroOptions } from 'nitropack'

export default (): NitroOptions['devProxy'] => {
  return {
    // 配置代理服务 --- 开发环境
    '/api/test': {
      target: process.env.VITE_TEST_PROXY_IP,
      changeOrigin: true,
      prependPath: true,
    },
    '/api': {
      target: process.env.VITE_TEST_PROXY_IP,
      changeOrigin: true,
      prependPath: true,
    },
  }
}
