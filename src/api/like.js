import request from '@/utils/request'

/**
 * @description
 * @param {Object} articleId
 */
export function isLiked(articleId) {
  return request.get(`/article/like/liked/${articleId}`)
}

/**
 * @description
 * @param {Object} params
 */
export function addLike(params) {
  return request({
    url: '/article/like/add',
    method: 'post',
    params: params
  })
}

/**
 * @description
 * @param {Object} params
 */
export function cancelLiked(params) {
  return request.delete('/article/like/cancel', { params })
}

