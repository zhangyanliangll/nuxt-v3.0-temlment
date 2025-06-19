import type { ProxyServerOptions } from 'httpxy'

type Rewrite = (path: string) => string

interface IProxyServerOptions extends ProxyServerOptions {
  rewrite: Rewrite
}

export default (): Record<string, IProxyServerOptions> => {
  return {
    // 配置代理服务 --- 开发环境
    '/api/test': {
      target: import.meta.env.VITE_DEV_PROXY_IP,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api\/test/, ''),
    },
    '/api': {
      target: import.meta.env.VITE_DEV_PROXY_IP,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ''),
    },
  }
}
