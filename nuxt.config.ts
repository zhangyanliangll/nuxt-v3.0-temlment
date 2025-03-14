// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'
import createDevServerConfig from './dev-server-config'

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',
  srcDir: 'src/',
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@unocss/nuxt',
    'nuxt-svgo',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@element-plus/nuxt',
  ],
  css: ['@unocss/reset/normalize.css'],
  unocss: {
    configFile: 'uno.config.ts',
  },
  elementPlus: {
    importStyle: 'scss',
    themes: ['dark'],
    injectionID: { prefix: 100, current: 1 },
    globalConfig: { size: 'small', zIndex: 1000 },
  },
  image: {
    dir: 'assets/images',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    provider: 'ipx',
    ipx: {
      maxAge: 3600,
    },
  },
  svgo: {
    autoImportPath: './assets/svg/',
    componentPrefix: process.env.VITE_ICON_LOCAL_PREFIX,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16, // 1rem的基准值, 对应设计稿中1rem的值
        propList: ['*'], // 对所有属性应用转换
        unitPrecision: 5, // 允许REM单位增长到的十进制数
        selectorBlackList: [], // 忽略的选择器
        replace: true, // 替换而不是追加px
        mediaQuery: false, // 允许在媒体查询中转换px
        minPixelValue: 0, // 最小的像素值转换为rem
      },
    },
  },
  devtools: {
    enabled: true,
  },
  plugins: [
    '~/utils/inject',
    '~/utils/date-format',
  ],
  i18n: {
    // 基本配置
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'zh',
        file: 'zh.json',
      },
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    langDir: resolve(__dirname, './src/locales/'),
    // 可选配置
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  nitro: {
    preset: 'node-server',
    devProxy: {
      ...createDevServerConfig(),
    },
  },
  vite: {
    optimizeDeps: {
      include: ['dayjs', 'axios'],
      exclude: [],
    },
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/index.scss" as *;',
        },
      },
    },
    build: {
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          // 关闭打印信息
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      open: true,
    },
  },
})
