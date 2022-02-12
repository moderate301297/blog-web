import request from '@/utils/request'

/**
 * @description
 * @param {Object} articleId
 */
export function isCollected(articleId, access_token) {
  return request({
    url: '/article/collect/collected',
    method: 'get',
    params: { articleId, access_token }
  })
}

/**
 * @description
 * @param {Object} params
 */
export function addCollect(params) {
  return request({
    url: '/article/collect/add',
    method: 'post',
    params: params
  })
}

/**
 * @description
 * @param {Object} params
 */
export function cancelCollected(params) {
  return request.delete('/article/collect/delete', { params })
}

/**
 * @description
 * @param {Object} params
 */
export function pageCollect(params) {
  return request.get('/article/collect/page', { params })
}
