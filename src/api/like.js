import request from '@/utils/request'

/**
 * @description
 * @param {Object} articleId
 */
export function isLiked(articleId, access_token) {
  return request({
    url: '/article/like/liked',
    method: 'get',
    params: { articleId, access_token }
  })
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

