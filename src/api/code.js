import request from '@/utils/request'

/**
 *
 * @param {Object} params
 */
export function sendCode(params) {
  return request({
    url: '/sms/send',
    method: 'post',
    params: params
  })
}
