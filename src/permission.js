import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getAccessToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import pathToRegexp from 'path-to-regexp'
import { bindEmail } from '@/api/user.js'

NProgress.configure({ showSpinner: false })
const whiteList = ['/', '/tag', '/category', '/archives',
  '/message', '/friend-link', '/article/:id', '/reset-password', '/about', '/search', '/terms', '/privacy', '/email-bind', '/404', '/oauth']

router.beforeEach(async(to, from, next) => {
  if (window.location.hostname === 'www.poile.cn' && to.path) {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    } else {
      var _hmt = []
      window._hmt = _hmt;
      (function() {
        const hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?0365897af075de8b1b3ba64f3cc7b423'
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    }
  }

  NProgress.start()

  const hasAccessToken = getAccessToken()

  if (pathToRegexp('/email-bind').exec(to.path)) {
    const code = to.query.code
    if (code) {
      const params = { code: code }
      let result = true
      await bindEmail(params).then(
        res => {
          result = true
        },
        _error => {
          result = false
        }
      )
      if (!result) {
        next('/404')
        NProgress.done()
      }
      if (result && hasAccessToken) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
        router.addRoutes(accessRoutes)
        next('/user/info')
        NProgress.done()
      }
      if (result && !hasAccessToken) {
        next('/')
        NProgress.done()
      }
    }
  }

  document.title = getPageTitle(to.meta.title)

  if (hasAccessToken) {
    const hasRoles = store.getters.roles && store.getters.roles.length > 0
    if (hasRoles) {
      next()
    } else {
      try {
        const { roles } = await store.dispatch('user/getUserInfo')

        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

        router.addRoutes(accessRoutes)

        next({ ...to, replace: true })
      } catch (error) {
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next('/')
        NProgress.done()
      }
    }
  } else {
    const included = whiteList.some(ele => pathToRegexp(ele).exec(to.path))
    if (included) {
      next()
    } else {
      const path = to.matched.length === 0 ? '/404' : '/'
      next(path)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
