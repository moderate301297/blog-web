import request from '@/utils/request'

/**
 * @param {Object} params
 * @description
 */
export function deleteFile(params) {
  return request.delete('/file/delete', { params })
}

/**
 *
 * @param {Object} params
 */
export function pageFile(params) {
  return request.get('/file/page', { params })
}
