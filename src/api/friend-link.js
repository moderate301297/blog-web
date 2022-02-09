import request from '@/utils/request'

/**
 *
 * @data {Object} data
 */
export function saveFriendLink(data) {
  return request.post('/friend/link/save', data)
}

/**
 *
 * @param {Object} params
 */
export function pageFriendLink(params) {
  return request.get('/friend/link/page', { params })
}

/**
 *
 */
export function listFriendLink() {
  return request.get('/friend/link/list')
}

/**
 *
 * @param {Number} id
 */
export function deleteFriendLink(id) {
  return request.delete(`/friend/link/delete/${id}`)
}
