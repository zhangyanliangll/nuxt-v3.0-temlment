// 文件下载方法

/**
 * 文件下载方法
 * @param {Blob} data
 * @param {any} headers
 */
export async function handleFileDownload(data: Blob, headers: any) {
  try {
    const blob = new Blob([data], { type: 'application/octet-stream' })
    // 匹配文件名
    const urlCode = headers['content-disposition'].match(/filename=(\S*)/)[1]
    // 将文件名解码
    const fileName = decodeURI(urlCode)
    const src = URL.createObjectURL(blob)
    if (src) {
      const $a = document.createElement('a')
      $a.setAttribute('href', src)
      $a.setAttribute('download', fileName.replace(new RegExp('"', 'g'), ''))
      const event = new MouseEvent('click')
      $a.dispatchEvent(event)
    }
    URL.revokeObjectURL(src) // 释放URL 对象
  }
  catch (err) {
    console.log(err)
  }
}

/**
 * 链接 文件下载方法
 * @param {string} url
 * @param {string} filename
 */
export const handleLinkDownloadFile = (url: string, filename: string) => {
  // 创建一个隐藏的 <a> 元素
  const a = document.createElement('a')
  a.href = url

  // 如果提供了文件名，则设置 download 属性
  if (filename) {
    a.download = filename
  }

  // 将 <a> 元素临时添加到页面中
  document.body.appendChild(a)

  // 触发点击事件
  a.click()

  // 之后移除 <a> 元素
  document.body.removeChild(a)
}
