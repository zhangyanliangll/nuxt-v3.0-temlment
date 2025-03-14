import { get } from '~/server'

export const getBannerListApi = () => {
  return get('/m1/1328576-1082679-default/pet/findByStatus')
}
