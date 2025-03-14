# [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)  + [Vue3.4](https://cn.vuejs.org/guide/introduction) 

#### 项目配置：

> 1. `node` 版本 `v18.20.1`;
> 1. `pnpm` 版本 `v8.6.1`;
> 2. `vue@3.4.21` | `pinia@2.2.1`;
> 3. `nuxt @3.12.4`;

## 项目启动

```bash
# 安装包
pnpm install

# 启动
pnpm run dev
```

## 项目打包

```bash
# SSR

## 测试环境
pnpm run build:test

## 正式环境
pnpm run build

# ---------------- #

# 静态部署

## 测试环境
pnpm run generate:test

## 正式环境
pnpm run generate
```

## src 目录结构
- src
  - apiss               api 接口
  - assets              资产目录
    - images            公用图片
    - scss              公共scss
    - json              本地数据目录
    - ts                公用脚本目录
  - components vue      组件目录
  - composables         
  - hooks               公共方法  
  - config              公共配置
    - env.ts            环境变量
    - server            api请求配置
  - layouts             布局
    - blank.vue         空白布局
    - default.vue       默认布局
  - locales             国际化
    - en.json           中文
    - zh.json.          英文
  - middleware          中间件
  - pages               页面目录
  - server              HTTPS
  - store               
  - typings             ts类型配置               
  - utils               工具  
    - computed          计算工具
    - download-file     文件下载工具             
  - app.vue  
- dev-server-config.ts  开发代理
- nuxt.config.ts        nuxt配置
