import request from '@/utils/request'

/**
 *
 * @data {Object} data
 */
export function pageArchives(params) {
  return request.get('/article/archives/page', { params })
}
