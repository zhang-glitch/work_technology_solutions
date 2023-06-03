const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue')
  },
  // {
  //   path: '/pins/:id',
  //   name: 'pins',
  //   component: () => import('@/views/pins/index.vue')
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/login-register/login/index.vue')
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('@/views/login-register/register/index.vue')
  // },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: () => import('@/views/profile/index.vue'),
  //   meta: {
  //     user: true
  //   }
  // },
  // {
  //   path: '/member',
  //   name: 'member',
  //   component: () => import('@/views/member/index.vue'),
  //   meta: {
  //     user: true
  //   }
  // },
  // {
  //   path: '/pay/result',
  //   name: 'payResult',
  //   component: () => import('@/views/pay/index.vue'),
  //   meta: {
  //     user: true
  //   }
  // },
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/views/error/404/index.vue')
  // },
  // // 404 页面处理
  // {
  //   path: '/:catchAll(.*)',
  //   name: 'error',
  //   redirect: '/404'
  // }
]


export default routes