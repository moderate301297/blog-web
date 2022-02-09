import request from '@/utils/request'

/**
 *
 * @params {Object} params
 */
export function addTag(params) {
  return request({
    url: '/tag/add',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function pageTag(params) {
  return request.get('/tag/page', { params })
}

/**
 *
 */
export function tagList() {
  return request.get('/tag/list')
}

/**
 *
 * @param {Object} params
 */
export function updateTag(params) {
  return request({
    url: '/tag/update',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} id
 */
export function deleteTag(id) {
  return request.delete('/tag/delete/' + id)
}
