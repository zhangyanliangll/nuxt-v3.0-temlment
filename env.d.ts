/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用开发环境代理IP */
  readonly VITE_DEV_PROXY_IP: string
  /** 应用API基础路径 */
  readonly VITE_API_BASE_URL: string
  /** 应用上传API路径 */
  readonly VITE_API_UPLOAD_URL: string
  /** 应用缓存前缀 */
  readonly VITE_APP_CACHE_PREFIX: string
  /** 应用端口 */
  readonly VITE_PORT: number
  /** 是否生产环境 */
  readonly VITE_PROD: string
  /** 是否开发环境 */
  readonly VITE_DEV: string
  /** 是否测试环境 */
  readonly VITE_TEST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
