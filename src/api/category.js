import request from '@/utils/request'

/**
 *
 * @data {Object} data
 */
export function addCategory(data) {
  return request.post('/category/add', data)
}

/**
 *
 * @param {Object} params
 */
export function pageCategory(params) {
  return request.get('/category/page', { params })
}
/**
 *
 */
export function categoryList() {
  return request.get('/category/list')
}

/**
 *
 * @param {Object} params
 */
export function updateCategory(params) {
  return request({
    url: '/category/update',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} id
 */
export function deleteCategory(id) {
  return request.delete('/category/delete/' + id)
}
