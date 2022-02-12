import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
/**
 *
 *
 * hidden: true
 * alwaysShow: true
 *
 * redirect: noRedirect
 * name:'router-name'
 * meta : {
    roles: ['admin','test']
    title: 'title'
    icon: 'svg-name'
    breadcrumb: false
    activeMenu: '/example/list'
  }
 */

/**
 *
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/index/index'),
    hidden: true
  },
  {
    path: '/tag',
    component: () => import('@/views/tag/index'),
    hidden: true
  },
  {
    path: '/category',
    component: () => import('@/views/category/index'),
    hidden: true
  },
  {
    path: '/archives',
    component: () => import('@/views/archives/index'),
    hidden: true
  },
  {
    path: '/message',
    component: () => import('@/views/message/index'),
    hidden: true
  },
  {
    path: '/friend-link',
    component: () => import('@/views/friend-link/index'),
    hidden: true
  },
  {
    path: '/article/:id',
    component: () => import('@/views/article/index'),
    hidden: true
  },
  {
    path: '/reset-password',
    component: () => import('@/views/reset-password/index'),
    hidden: true
  },
  {
    path: '/email-validate',
    component: () => import('@/views/email-validate/index'),
    hidden: true
  },
  {
    path: '/rebind-mobile',
    component: () => import('@/views/rebind-mobile/index'),
    hidden: true
  },
  {
    path: '/bind-mobile',
    component: () => import('@/views/bind-mobile/index'),
    hidden: true
  },
  {
    path: '/about',
    component: () => import('@/views/about/index'),
    hidden: true
  },
  {
    path: '/terms',
    component: () => import('@/views/terms/index'),
    hidden: true
  },
  {
    path: '/privacy',
    component: () => import('@/views/privacy/index'),
    hidden: true
  },
  {
    path: '/search',
    component: () => import('@/views/search/index'),
    hidden: true
  },
  {
    path: '/email-bind',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/oauth',
    component: () => import('@/views/oauth'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    children: [{
      path: 'info',
      name: 'Info',
      component: () => import('@/views/user/index'),
      meta: {
        title: 'Profile',
        icon: 'user'
      }
    }]
  },
  {
    path: '/collect',
    component: Layout,
    children: [{
      path: 'index',
      name: 'collect',
      component: () => import('@/views/collect-manage/index'),
      meta: {
        title: 'Collections',
        icon: 'collect-manage'
      }
    }]
  }
]

/**
 *
 */
export const asyncRoutes = [
  {
    path: '/user-manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'UserManage',
      component: () => import('@/views/user-manage/index'),
      meta: {
        title: 'User management',
        icon: 'user-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/art-manage',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: 'Article management',
      icon: 'art-manage',
      roles: ['admin']
    },
    children: [{
      path: 'edit',
      name: 'Edit',
      component: () => import('@/views/article-manage/edit'),
      meta: {
        title: 'Edit article',
        icon: 'art-edit'
      }
    },
    {
      path: 'list',
      name: 'List',
      component: () => import('@/views/article-manage/list'),
      meta: {
        title: 'List article',
        icon: 'art-list'
      }
    }
    ]
  },
  {
    path: '/recommend',
    component: Layout,
    children: [{
      path: 'index',
      name: 'RecommendManage',
      component: () => import('@/views/recommend-manage/index'),
      meta: {
        title: 'Recommend management',
        icon: 'recommend-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/tag-manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'TagManage',
      component: () => import('@/views/tag-manage/index'),
      meta: {
        title: 'Tag management',
        icon: 'tag-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/category-manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'CategoryManage',
      component: () => import('@/views/category-manage/index'),
      meta: {
        title: 'Category management',
        icon: 'category-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/friend-link/manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'FriendChainManage',
      component: () => import('@/views/friend-link-manage/index'),
      meta: {
        title: 'Friend management',
        icon: 'friend-chain-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/client',
    component: Layout,
    children: [{
      path: 'index',
      name: 'client',
      component: () => import('@/views/client-manage/index'),
      meta: {
        title: 'Client managemment',
        icon: 'client-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/file',
    component: Layout,
    children: [{
      path: 'index',
      name: 'File',
      component: () => import('@/views/file-manage/index'),
      meta: {
        title: 'File management',
        icon: 'file-manage',
        roles: ['admin']
      }
    }]
  },
  // 404
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

/**
 *
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
