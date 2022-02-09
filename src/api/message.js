import request from '@/utils/request'

/**
 * @param {Object} params
 * @description
 */
export function pageMessage(params) {
  return request.get('/leave/message/page', { params })
}

/**
 * @description
 * @param {Object} params
 */
export function addMessage(params) {
  return request({
    url: '/leave/message/add',
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
    url: '/leave/message/reply',
    method: 'post',
    params: params
  })
}

/**
 * @description
 * @param {Object} id
 */
export function deleteO(id) {
  return request.delete('/leave/message/delete/' + id)
}
