import {
  createI18n,
} from 'vue-i18n'
// 引入同级目录下文件
const modules = import.meta.globEager('./*')

// 假设你还有其他目录下的语言文件 它的路径是 src/views/home/locales/en-US.ts
// 那么你就可以 使用 :lower:（小写） :upper:（大写） 来引入文件
// const viewModules = import.meta.globEager('../views/**/locales/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].ts')
function getLangAll() {
  let message = {}
  getLangFiles(modules, message)
  //   getLangFiles(viewModules,message)
  // console.log(message)
  return message
}

export const getLocale = () => {
  let language
  const localLang = localStorage.getItem('localLang')
  if (localLang) {
    language = localLang
  }
  else {
    language = (
      (navigator.language ? navigator.language : navigator.userLanguage) || 'en'
    )
  }
  language = language.replace(/(.+)-.*/, '$1')
  if (language !== 'en') {
    language = 'en'
  }
  localStorage.setItem('localLang', language)
  return language
}
const CURRENT_LANG = getLocale()
/**
 * 获取所有语言文件
 * @param {Object} mList
 */
function getLangFiles(mList, msg) {
  for (let path in mList) {
    if (mList[path].default) {
      //  获取文件名
      let pathName = path.substr(path.lastIndexOf('/') + 1, 2)

      if (msg[pathName]) {
        msg[pathName] = {
          ...mList[pathName],
          ...mList[path].default,
        }
      }
      else {
        msg[pathName] = mList[path].default
      }
    }
  }
  // console.log('msg:', msg)
}
// debugger;
// 注册i8n实例并引入语言文件
const i18n = createI18n({
  legacy: false, // 使用Composition API，这里必须设置为false
  globalInjection: true,
  global: true,
  locale: CURRENT_LANG,
  fallbackLocale: CURRENT_LANG, // 默认语言
  globalInjection: true, // 全局生效$t
  messages: getLangAll(),
})
i18n.setLang = (lang) => { // 设置当前语言环境
  i18n.locale = lang
  // console.log('默认配置',lang)
  localStorage.setItem('localLang', lang)
  // location.href = location.href
  return lang
}
export default i18n
