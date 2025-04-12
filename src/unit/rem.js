import {
  useRouter,
  useRoute,
} from 'vue-router'

let rem = 42
const baseRem = 42
const baseFontSize = 32
const baseWidth = 1920
const maxClientWidth = 1920
const minClientWidth = 770
const route = useRoute()
const router = useRoute()

const setRem = () => {
  requestAnimationFrame(() => {
    const clientWidth = window.innerWidth || minClientWidth
    const innerWidth = Math.max(clientWidth, minClientWidth)
    // 计算缩放比例
    const minScale = Math.max(maxClientWidth / innerWidth, 1)
    const scale = Math.min(minScale, 1.36)

    // 计算 rem 值
    rem = Math.floor((innerWidth / baseWidth) * baseFontSize * scale)

    // console.log("innerWidth", innerWidth, 'fontSize', rem, 'scale', scale);
    // console.log("clientWidth", clientWidth);
    // console.log(window.location)
    if (clientWidth < 770) {
      let phatnameslist = window.location.pathname.split('/')
      let srtname = ''
      phatnameslist.splice(0, 2)
      phatnameslist.forEach((item, index) => {
        let dtt = index < phatnameslist.length - 1 ? '/' : ''
        srtname += item + dtt
      })
      console.log('pathname:', srtname)
      // return
      // if (import.meta.env.VITE_APP_ENV == 'test') {
      //   // router.push({
      //   // 	path: "/mhome",
      //   // 	query: {
      //   // 		paths: "http://120.79.141.255/wap/" + srtname + window.location.search
      //   // 	}
      //   // })
      //   location.href = `${window.location.origin}/wap/${srtname}${window.location.search}`
      //     .search
      //   // location.href = "http://localhost:8080/" + srtname + window.location
      //   // 	.search
      // }
      // else {
      //   // router.push({
      //   // 	path: "/mhome",
      //   // 	query: {
      //   // 		paths: "https://m.homeiliving.com/" + srtname + window.location
      //   // 	}
      //   // })
      //   location.href = 'https://m.homeiliving.com/' + srtname + window.location
      //     .search
      // }
      rem = 44.5
    }
    // 设置 html 元素的字体大小
    document.documentElement.style.fontSize = `${rem}px`
  })
}

// 防抖函数
const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// 初始化
setRem()

// 改变窗口大小时重新设置 rem
window.onresize = setRem // debounce(setRem, 100);
// 获取根元素字体大小（1rem 对应的像素值）
const baseRemPx = parseFloat(getComputedStyle(document.documentElement).fontSize)

export const pxToRem = px => `${px / baseRem}rem`
export const pxToRemnum = px => `${px / rem}`
// 从 rem 转换到 px 的函数
export const remToPx = rem => `${rem * baseRem}`

export const pxToScale = px => (px / baseRem) * rem
