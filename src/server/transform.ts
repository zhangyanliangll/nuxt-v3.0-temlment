import qs from 'qs'
import FormData from 'form-data'
import { isFile, isArray } from '@/utils/is'

/**
 * 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
export function transformRequestData(
  requestData: any | string,
  contentType?: string,
): any {
  // application/json 类型不处理
  let data = requestData
  // form类型转换
  if (contentType === 'application/x-www-form-urlencoded') {
    data = qs.stringify(requestData)
  }
  // form-data类型转换
  if (contentType === 'multipart/form-data') {
    data = handleFormData(requestData)
  }

  return data
}

function handleFormData(data: Record<string, any>) {
  const formData = new FormData()
  const entries = Object.entries(data)

  for (const [key, value] of entries) {
    const isFileType
      = isFile(value) || (isArray(value) && value.length && isFile(value[0]))
    if (isFileType) {
      transformFile(formData, key, value)
    }
    else {
      formData.append(key, value)
    }
  }

  return formData
}

/**
 * 接口为上传文件的类型时数据转换
 * @param formData
 * @param key - 文件的属性名
 * @param file - 单文件或多文件
 */
function transformFile(
  formData: FormData,
  key: string,
  file: File[] | File,
) {
  if (isArray(file)) {
    // 多文件
    (file as File[]).map((item) => {
      const { fileName, name } = item as Record<string, any>
      formData.append(key, item, fileName || name)
      return true
    })
  }
  else {
    // 单文件
    const { fileName, name } = file as Record<string, any>
    formData.append(key, file, fileName || name)
  }
}
