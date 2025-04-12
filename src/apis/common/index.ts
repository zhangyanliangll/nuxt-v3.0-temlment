import { get, post } from '~/server'

export const getBannerListApi = () => {
  return get('/m1/1328576-1082679-default/pet/findByStatus')
}

// 提交联系信息
export const putContactInfo = (data: any) => post('/front/inquiry/add', data)

// 首页视频推荐
export const homepageVideoCommendApi = () => post('/front/index/homepageVideoCommend')

// 公司信息
export const getCompanyInfo = (data: any) => post('/front/index/information', data)
