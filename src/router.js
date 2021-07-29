import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth/authService'
import store from '@/store/store'

import guest from '@/middleware/guest'
import authorization from '@/middleware/auth'
import middlewarePipeline from '@/middlewarePipeline'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {

      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [

        {
          path: '/',
          redirect: '/ads-manager/users',
        },
        {
          path: '/ads-manager',
          redirect: '/ads-manager/users',
        },
        {
          path: '/ads-manager/users',
          name: 'manager-users',
          component: () => import('@/views/AdsManager/Users.vue'),
          meta: {
            rule: 'editor',
            parent: '/ads-manager',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/ads-manager/accounts',
          name: 'accounts-users',
          component: () => import('@/views/AdsManager/Accounts.vue'),
          meta: {
            rule: 'editor',
            parent: '/ads-manager',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/ads-manager/dates',
          name: 'dates',
          component: () => import('./views/AdsManager/Dates.vue'),
          meta: {
            rule: 'editor',
            parent: '/ads-manager',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/ads-manager/bms',
          name: 'bms',
          component: () => import('./views/AdsManager/BMS.vue'),
          meta: {
            rule: 'editor',
            parent: '/ads-manager',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/ads-manager/ad-accounts',
          name: 'adaccounts',
          component: () => import('./views/AdsManager/AdAccounts.vue'),
          meta: {
            rule: 'editor',
            parent: '/ads-manager',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/ads-manager/campaigns',
          name: 'campaingns',
          component: () => import('./views/AdsManager/Campaigns.vue'),
          meta: {
            rule: 'editor',
            parent: '/ads-manager',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/ads-manager/adsets',
          name: 'adsets',
          component: () => import('./views/AdsManager/Adsets.vue'),
          meta: {
            rule: 'editor',
            parent: '/ads-manager',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/ads-manager/ads',
          name: 'ads',
          component: () => import('./views/AdsManager/ADS.vue'),
          meta: {
            rule: 'editor',
            parent: '/ads-manager',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/auto-rules',
          redirect: '/auto-rules/facebook',
          middleware: [
            authorization
          ]
        },
        {
          path: '/auto-rules/facebook',
          name: 'facebook',
          component: () => import('./views/AutoRules/Facebook.vue'), 
          meta: {
            rule: 'editor',
            parent: '/auto-rules',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/auto-rules/rules-groups',
          name: 'rulesgroup',
          component: () => import('./views/AutoRules/RulesGroup.vue'), 
          meta: {
            rule: 'editor',
            parent: '/auto-rules',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/comments',
          redirect: '/comments/feed'
        },
        {
          path: '/comments/feed',
          name: 'commentsfeed',
          component: () => import('./views/Comments/Feed.vue'), 
          meta: {
            rule: 'editor',
            parent: '/comments',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/tracker',
          redirect: '/tracker/conversions'
        },
        {
          path: '/tracker/conversions',
          name: 'trackerconversions',
          component: () => import('./views/Tracker/Conversions.vue'), 
          meta: {
            rule: 'editor',
            parent: '/tracker',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/tracker/postback',
          name: 'trackerpostback',
          component: () => import('./views/Tracker/Postback.vue'), 
          meta: {
            rule: 'editor',
            parent: '/tracker',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/proxy',
          name: 'proxy',
          component: () => import('./views/Proxy/Index.vue'), 
          meta: {
            rule: 'editor',
            parent: '/proxy',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('./views/News/List.vue'), 
          meta: {
            rule: 'editor',
            parent: '/news',
            middleware: [
              authorization
            ]
          }
        },
        {
          path: '/vocabulary',
          name: 'vocabulary',
          component: () => import('./views/Vocabulary/Index.vue'), 
          meta: {
            rule: 'editor',
            middleware: [
              authorization
            ]
          }
        },        
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/Login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/register',
          name: 'page-register',
          component: () => import('@/views/Register/Register.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('@/views/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/error-404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware
  const context = {
      to,
      from,
      next,
      store
  }
  return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1)
  })
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})



export default router
