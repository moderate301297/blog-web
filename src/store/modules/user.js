import { accountLogin, logout } from '@/api/user'
import { getAccessToken, setAccessToken, removeAccessToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { thirdLogin } from '@/api/user.js'
const state = {
  token: getAccessToken(),
  nickname: '',
  avatar: '',
  roles: [],
  userInfo: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  accountLogin({ commit }, params) {
    return new Promise((resolve, reject) => {
      accountLogin(params).then(response => {
        console.log('dataR', response)
        commit('SET_TOKEN', response.data.access_token)
        setAccessToken(response.data.access_token)
        commit('SET_USER_INFO', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  thirdLogin({ commit }, params) {
    return new Promise((resolve, reject) => {
      thirdLogin(params).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        // setAccessToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // getUserInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getUserInfo(getAccessToken()).then(response => {
  //       if (!response.data) {
  //         reject('user not found')
  //       }

  //       if (!response.data.roles || response.data.roles.length <= 0) {
  //         reject('role not found')
  //       }
  //       commit('SET_ROLES', response.data.roles)
  //       commit('SET_USER_INFO', response.data)
  //       resolve(response.data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      const access_token = state.token
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USER_INFO', '')
      removeAccessToken()
      resetRouter()
      const params = {
        access_token: access_token
      }
      logout(params).then(res => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USER_INFO', '')
      // removeAccessToken()
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
