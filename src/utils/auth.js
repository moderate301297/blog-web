import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'

const AccessTokenKey = 'access_token'
const UsernameKey = 'username'
const PasswordKey = 'password'
const RememberKey = 'remember'
/**
 * accessToken
 */
export function getAccessToken() {
  return Cookies.get(AccessTokenKey)
}

/**
 * accessToken
 * @param {String} token
 */
export function setAccessToken(token) {
  return Cookies.set(AccessTokenKey, token, { expires: 15 })
}

/**
 * accessToken
 */
export function removeAccessToken() {
  return Cookies.remove(AccessTokenKey)
}

/**
 *
 * @param {String} username
 */
export function setUsername(username) {
  return Cookies.set(UsernameKey, Base64.encode(username), { expires: 15 })
}

/**
 *
 */
export function getUsername() {
  const v = Cookies.get(UsernameKey)
  return v ? Base64.decode(v) : v
}

/**
 *
 */
export function removeUsername() {
  return Cookies.remove(UsernameKey)
}

/**
 *
 * @param {String} password
 */
export function setPassword(password) {
  return Cookies.set(PasswordKey, Base64.encode(password), { expires: 15 })
}

/**
 *
 */
export function getPassword() {
  const v = Cookies.get(PasswordKey)
  return v ? Base64.decode(v) : v
}

/**
 *
 */
export function removePassword() {
  return Cookies.remove(PasswordKey)
}

/**
 *
 */
export function setRemember(checked) {
  return Cookies.set(RememberKey, checked, { expires: 15 })
}

/**
 *
 */
export function getRemember() {
  return Cookies.get(RememberKey)
}
