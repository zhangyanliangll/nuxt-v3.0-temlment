import dayjs from 'dayjs'

export default defineNuxtPlugin(() => {
  const isValidDate = (dateString: string) => {
    return dayjs(dateString).isValid() && new Date(dateString).getFullYear() > 1996
  }

  // 格式化时间
  Object.defineProperty(Date.prototype, 'format', {
    writable: true,
    enumerable: false, // 不可枚举
    configurable: true,
    value: function (val = 'YYYY-MM-DD') {
      if (!isValidDate(this))
        return ''
      return dayjs(this).format(val || 'YYYY-MM-DD')
    },
  })

  // 格式化时间 'YYYY-MM-DD HH:mm'
  Object.defineProperty(Date.prototype, 'datetime', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function () {
      if (!isValidDate(this))
        return ''
      return dayjs(this).format('YYYY-MM-DD HH:mm')
    },
  })

  // 格式化时间 'YYYY-MM-DD HH:mm:ss'
  Object.defineProperty(Date.prototype, 'dateTime', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function () {
      if (!isValidDate(this))
        return ''
      return dayjs(this).format('YYYY-MM-DD HH:mm:ss')
    },
  })
})
