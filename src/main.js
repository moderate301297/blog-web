import Vue from 'vue'

import 'normalize.css/normalize.css'

import './element-ui.js'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import VueClipboard from 'vue-clipboard2'

import '@/styles/index.scss'

import App from './App'

// vuex
import store from './store'

import router from './router'

import '@/icons'

import '@/permission'

Vue.use(VueQuillEditor)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
