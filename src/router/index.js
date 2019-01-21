import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component(resolve) {
        require.ensure(['view/index.vue'], () => {
          resolve(require('view/index.vue'))
        })
      },
      children: [{
          path: '',
          component(resolve) {
            require.ensure(['view/home.vue'], () => {
              resolve(require('view/home.vue'))
            })
          }
        },
        {
          path: '/sendMsg',
          component(resolve) {
            require.ensure(['view/sendMsg/sendMsg.vue'], () => {
              resolve(require('view/sendMsg/sendMsg.vue'))
            })
          }
        },
        {
          path: '/sendRecord',
          component(resolve) {
            require.ensure(['view/sendMsg/sendRecord.vue'], () => {
              resolve(require('view/sendMsg/sendRecord.vue'))
            })
          }
        },
        {
          path: '/autoRule',
          component(resolve) {
            require.ensure(['view/sendMsg/autoRule'], () => {
              resolve(require('view/sendMsg/autoRule'))
            })
          }
        },
        {
          path: '/addAutoRule',
          meta: {
            keepAlive: true
          },
          component(resolve) {
            require.ensure(['view/sendMsg/addAutoRule'], () => {
              resolve(require('view/sendMsg/addAutoRule'))
            })
          }
        },
        {
          path: '/previewAutoRule',
          component(resolve) {
            require.ensure(['view/sendMsg/previewAutoRule'], () => {
              resolve(require('view/sendMsg/previewAutoRule'))
            })
          }
        },
        {
          path: '/treatment',
          meta: {
            keepAlive: true
          },
          component(resolve) {
            require.ensure(['view/sendMsg/treatment'], () => {
              resolve(require('view/sendMsg/treatment'))
            })
          }
        },
        {
          path: '/customerInfo',
          component(resolve) {
            require.ensure(['view/sendMsg/customerInfo'], () => {
              resolve(require('view/sendMsg/customerInfo'))
            })
          }
        },
        {
          path: '/msgSupervise',
          component(resolve) {
            require.ensure(['view/sendMsg/msgSupervise'], () => {
              resolve(require('view/sendMsg/msgSupervise'))
            })
          }
        },
        {
          path: '/blackList',
          component(resolve) {
            require.ensure(['view/sendMsg/blackList'], () => {
              resolve(require('view/sendMsg/blackList'))
            })
          }
        },
        {
          path: '/userList',
          meta: {
            keepAlive: true
          },
          component(resolve) {
            require.ensure(['view/user/userList'], () => {
              resolve(require('view/user/userList'))
            })
          }
        },
        {
          path: '/applyList',
          component(resolve) {
            require.ensure(['view/user/applyList'], () => {
              resolve(require('view/user/applyList'))
            })
          }
        },
        {
          path: '/userTeam',
          component(resolve) {
            require.ensure(['view/user/userTeam'], () => {
              resolve(require('view/user/userTeam'))
            })
          }
        },
        {
          path: '/appCusList',
          meta: {
            keepAlive: true
          },
          component(resolve) {
            require.ensure(['view/customer/appCusList'], () => {
              resolve(require('view/customer/appCusList'))
            })
          }
        },
        {
          path: '/appCusInfo',
          component(resolve) {
            require.ensure(['view/customer/appCusInfo'], () => {
              resolve(require('view/customer/appCusInfo'))
            })
          }
        },
        {
          path: '/hrpCusList',
          component(resolve) {
            require.ensure(['view/customer/hrpCusList'], () => {
              resolve(require('view/customer/hrpCusList'))
            })
          }
        },
        {
          path: '/cusFilter',
          meta: {
            keepAlive: true
          },
          component(resolve) {
            require.ensure(['view/customer/cusFilter'], () => {
              resolve(require('view/customer/cusFilter'))
            })
          }
        },
        {
          path: '/productAudit',
          component(resolve) {
            require.ensure(['view/product/productAudit'], () => {
              resolve(require('view/product/productAudit'))
            })
          }
        },
        {
          path: '/productEdit',
          component(resolve) {
            require.ensure(['view/product/productEdit'], () => {
              resolve(require('view/product/productEdit'))
            })
          }
        },
        {
          path: '/productList',
          component(resolve) {
            require.ensure(['view/product/productList'], () => {
              resolve(require('view/product/productList'))
            })
          }
        },
        {
          path: '/salesRecord',
          component(resolve) {
            require.ensure(['view/product/salesRecord'], () => {
              resolve(require('view/product/salesRecord'))
            })
          }
        },
        {
          path: '/productRecord',
          component(resolve) {
            require.ensure(['view/product/productRecord'], () => {
              resolve(require('view/product/productRecord'))
            })
          }
        },
        {
          path: '/productDrafts',
          component(resolve) {
            require.ensure(['view/product/productDrafts'], () => {
              resolve(require('view/product/productDrafts'))
            })
          }
        },
        {
          path: '/orderList',
          meta: {
            keepAlive: true
          },
          component(resolve) {
            require.ensure(['view/order/orderList'], () => {
              resolve(require('view/order/orderList'))
            })
          }
        },
        {
          path: '/orderRecord',
          component(resolve) {
            require.ensure(['view/order/orderRecord'], () => {
              resolve(require('view/order/orderRecord'))
            })
          }
        },
        {
          path: '/consult',
          component(resolve) {
            require.ensure(['view/count/consult'], () => {
              resolve(require('view/count/consult'))
            })
          }
        },
        {
          path: '/bindCount',
          component(resolve) {
            require.ensure(['view/count/bindCount'], () => {
              resolve(require('view/count/bindCount'))
            })
          }
        },
        {
          path: '/staffStatistics',
          component(resolve) {
            require.ensure(['view/count/staffStatistics'], () => {
              resolve(require('view/count/staffStatistics'))
            })
          }
        },
        {
          path: '/hospSetting',
          component(resolve) {
            require.ensure(['view/setting/hospSetting'], () => {
              resolve(require('view/setting/hospSetting'))
            })
          }
        },
        {
          path: '/accountSetting',
          component(resolve) {
            require.ensure(['view/setting/accountSetting'], () => {
              resolve(require('view/setting/accountSetting'))
            })
          }
        },
        // 预约
        {
          path: '/subscribeList',
          component(resolve) {
            require.ensure(['view/subscribe/subscribeList'], () => {
              resolve(require('view/subscribe/subscribeList'))
            })
          }
        },
        {
          path: '/subscribeAwait',
          component(resolve) {
            require.ensure(['view/subscribe/subscribeAwait'], () => {
              resolve(require('view/subscribe/subscribeAwait'))
            })
          }
        },
        {
          path: '/subscribeAlready',
          component(resolve) {
            require.ensure(['view/subscribe/subscribeAlready'], () => {
              resolve(require('view/subscribe/subscribeAlready'))
            })
          }
        },
        {
          path: '/subscribeCancel',
          component(resolve) {
            require.ensure(['view/subscribe/subscribeCancel'], () => {
              resolve(require('view/subscribe/subscribeCancel'))
            })
          }
        },
        // 治疗
        {
          path: '/cure',
          component(resolve) {
            require.ensure(['view/order/cure'], () => {
              resolve(require('view/order/cure'))
            })
          }
        },
        {
          path: '/cureList',
          component(resolve) {
            require.ensure(['view/order/cureList'], () => {
              resolve(require('view/order/cureList'))
            })
          }
        },
        {
          path: '/cureDetails',
          component(resolve) {
            require.ensure(['view/order/cureDetails'], () => {
              resolve(require('view/order/cureDetails'))
            })
          }
        },
        // 医生列表
        {
          path: '/doctorList',
          component(resolve) {
            require.ensure(['view/user/doctorList'], () => {
              resolve(require('view/user/doctorList'))

            })
          }
        },
        {
          path: '/doctorDetails',
          component(resolve) {
            require.ensure(['view/user/doctorDetails'], () => {
              resolve(require('view/user/doctorDetails'))
            })
          }
        },
        {
          path: '/addDoctor',
          component(resolve) {
            require.ensure(['view/user/addDoctor'], () => {
              resolve(require('view/user/addDoctor'))
            })
          }
        },
        {
          path: '/addDoctors',
          component(resolve) {
            require.ensure(['view/user/addDoctors'], () => {
              resolve(require('view/user/addDoctors'))
            })
          }
        },
        {
          path: '/addDoctorf',
          component(resolve) {
            require.ensure(['view/user/addDoctorf'], () => {
              resolve(require('view/user/addDoctorf'))
            })
          }
        },
        {
          path: '/doctorCertified',
          component(resolve) {
            require.ensure(['view/user/doctorCertified'], () => {
              resolve(require('view/user/doctorCertified'));

            })
          }
        },
        // 优选
        {
          path: '/staffAnalysis',
          component(resolve) {
            require.ensure(['view/miniApps/staffAnalysis'], () => {
              resolve(require('view/miniApps/staffAnalysis'))
            })
          }
        },
        {
          path: '/clientOver',
          component(resolve) {
            require.ensure(['view/miniApps/clientOver'], () => {
              resolve(require('view/miniApps/clientOver'))
            })
          }
        },
        {
          path: '/bindingApps',
          component(resolve) {
            require.ensure(['view/miniApps/bindingApps'], () => {
              resolve(require('view/miniApps/bindingApps'))
            })
          }
        }
      ]
    },
    {
      path: '/login',
      component(resolve) {
        require.ensure(['view/login.vue'], () => {
          resolve(require('view/login.vue'))
        })
      }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    if (savedPosition) {
      return savedPosition
    }
    // 滚动到锚点
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    // 让页面滚动到顶部
    return {
      x: 0,
      y: 0
    }
  }

})


// //路由进入前后事件
// router.beforeEach((to, from, next) => {
//   //防止没有登录直接登录主页面
//   const companyId = window.sessionStorage.getItem('companyId')

//   if (!companyId) {
//     if (to.path !== '/login') {
//       return next({
//         path: '/login'
//       })
//     } else {
//       next()
//     }
//   } else {
//     if (to.path === '/login') {
//       window.sessionStorage.removeItem('companyId')
//     }
//     next()
//   }
// })

export default router
