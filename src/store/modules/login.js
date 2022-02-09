import {
  getUsername,
  setUsername,
  removeUsername,
  setPassword,
  getPassword,
  removePassword
} from '@/utils/auth'

const state = {
  visible: false,
  username: getUsername(),
  password: getPassword()
}

const mutations = {
  CHANGE_VISIBLE: (state, value) => {
    state.visible = value
  },

  SET_USERNAME: (state, value) => {
    state.username = value
  },

  SET_PASSWORD: (state, value) => {
    state.password = value
  }
}

const actions = {

  setUsernameAndPassword({ commit }, params) {
    return new Promise((resolve, reject) => {
      const username = params.username
      const password = params.password
      commit('SET_USERNAME', username)
      commit('SET_PASSWORD', password)
      setUsername(username)
      setPassword(password)
      resolve()
    }).catch(error => {
      // eslint-disable-next-line no-undef
      reject(error)
    })
  },

  clearUsernameAndPassword({ commit }, params) {
    return new Promise((resolve, reject) => {
      commit('SET_USERNAME', '')
      commit('SET_PASSWORD', '')
      removeUsername()
      removePassword()
      resolve()
    }).catch(error => {
      // eslint-disable-next-line no-undef
      reject(error)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
