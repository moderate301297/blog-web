import request from '@/utils/request'

/**
 *
 * @data {Object} data
 */
export function saveArticle(data) {
  return request.post('/article/save', data)
}

/**
 *
 * @param {Object} id
 */
export function articleDetail(id) {
  return request.get(`/article/detail/${id}`)
}

/**
 *
 * @param {Object} params
 */
export function pageArticle(params) {
  return request.get('/article/page', { params })
}

/**
 *
 * @param {Object} params
 */
export function updateStatus(params) {
  return request({
    url: '/article/status/update',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function pagePublishedArticle(params) {
  return request.get('/article/published/page', { params })
}

/**
 *
 * @param {Number} id
 */
export function deleteArticle(id) {
  return request.delete(`/article/delete/${id}`)
}

/**
 *
 * @param {Object} params
 */
export function addRecommend(params) {
  return request({
    url: '/article/recommend/save',
    method: 'post',
    params: params
  })
}

/**
 * @description
 */
export function recommendList() {
  return request.get('/article/recommend/list')
}

/**
 *
 * @param {Number} id
 */
export function deleteRecommend(id) {
  return request.delete('/article/recommend/delete/' + id)
}

/**
 * @description
 * @param {Object} id
 */
export function viewArtilce(id) {
  return request.get('/article/view/' + id)
}

/**
 *
 * @param {Object} id
 */
export function incrementView(id, countView) {
  return request({
    url: '/article/increment_view/' + id,
    method: 'put',
    params: { countView }
  })
}

/**
 * @description
 * @param {Object} params
 */
export function interrelated(params) {
  return request.get('/article/interrelated/list', { params })
}

/**
 * @description
 * @param {Object} params
 */
export function updateLikeCount(params) {
  console.log('params', params)
  return request({
    url: '/article/update_like',
    method: 'put',
    params: params
  })
}
