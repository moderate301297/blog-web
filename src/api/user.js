import request from '@/utils/request'

/**
 *
 * @param {Object} params
 */
export function accountLogin(params) {
  return request({
    url: '/users/login',
    headers: {
      'Authorization': 'Basic cGM6MTIzNDU2'
    },
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function thirdLogin(params) {
  return request({
    url: '/oauth',
    headers: {
      'Authorization': 'Basic cGM6MTIzNDU2'
    },
    method: 'post',
    params: params
  })
}

/**
 * @description
 * @param {String} token
 */
export function getUserInfo(token) {
  return request({
    url: '/users/info',
    method: 'get',
    params: { token }
  })
}

/**
 * @description
 * @param {Object} params
 */
export function logout(params) {
  return request({
    url: 'users/logout',
    headers: {
      'Authorization': 'Basic cGM6MTIzNDU2'
    },
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} data
 */
export function register(data) {
  return request.post('/users/register', data)
}

/**
 *
 * @param {Object} data
 */
export function updateUser(data) {
  console.log('updateUser ', data)
  return request.post('/users/update/' + data.userId, data)
}

/**
 *
 * @param {Object} params
 */
export function updatePassword(params) {
  return request({
    url: '/user/password/update',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function resetPassword(params) {
  return request({
    url: '/user/password/reset',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function validateEmail(params) {
  return request({
    url: '/user/email/validate',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function bindEmail(params) {
  return request({
    url: '/user/email/bind',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function validateMobile(params) {
  return request({
    url: '/user/mobile/validate',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function rebindMobile(params) {
  return request({
    url: '/user/mobile/rebind',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function pageUser(params) {
  return request.get('/user/page', { params })
}

/**
 *
 * @param {Object} params
 */
export function updateStatus(params) {
  return request({
    url: '/user/status/update',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object}  params
 */
export function bindUsername(params) {
  return request({
    url: '/user/username/bind',
    method: 'post',
    params: params
  })
}

/**
 *
 * @param {Object} params
 */
export function bindMobile(params) {
  return request({
    url: '/user/mobile/bind',
    method: 'post',
    params: params
  })
}
