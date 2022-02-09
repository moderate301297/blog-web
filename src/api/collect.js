import request from '@/utils/request'

/**
 * @description
 * @param {Object} articleId
 */
export function isCollected(articleId) {
  return request.get(`/article/collect/collected/${articleId}`)
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
