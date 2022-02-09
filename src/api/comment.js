import request from '@/utils/request'

/**
 * @param {Object} params
 * @description
 */
export function pageComment(params) {
  return request.get('/article/comment/page', { params })
}

/**
 * @description
 * @param {Object} params
 */
export function addComment(params) {
  return request({
    url: '/article/comment/add',
    method: 'post',
    params: params
  })
}

/**
 * @description
 * @param {Object} params
 */
export function addReply(params) {
  return request({
    url: '/article/reply/add',
    method: 'post',
    params: params
  })
}

/**
 * @description
 * @param {Object} params
 */
export function deleteComment(params) {
  return request.delete('/article/comment/delete', { params })
}

/**
 * @description
 * @param {Object} params
 */
export function deleteReply(params) {
  return request.delete('/article/reply/delete', { params })
}

/**
 * @description
 * @param {Object} params
 */
export function latestCommentList(params) {
  return request.get('/article/comment/latest', { params })
}
