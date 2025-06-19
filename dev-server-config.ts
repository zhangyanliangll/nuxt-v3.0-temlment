import type { ProxyServerOptions } from 'httpxy'

type Rewrite = (path: string) => string

interface IProxyServerOptions extends ProxyServerOptions {
  rewrite: Rewrite
}

export default (): Record<string, IProxyServerOptions> => {
  return {
    // 配置代理服务 --- 开发环境
    '/api/test': {
      target: 'http://10.0.17.195:32000',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api\/test/, ''),
    },
    '/api': {
      target: 'http://10.0.17.195:32000',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ''),
    },
  }
}
