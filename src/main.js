// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

import echarts from 'echarts'

//封装
import http from './utils/fetch.js'
Vue.use(http)

//token
import token from 'utils/cache.js'
Vue.prototype.$token = token

//ui框架
import iView from 'iview'
// import './assets/style/theme/rest-iview.less'
Vue.use(iView)

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
