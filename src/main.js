import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'

// ====================================================================================================================
// 单页应用初始化，可以读取url携带的参数。
console.log('=====< VUE 系统初始化 >=====')

// 引入nodejs的rul和querystring模块。
const url = require('url')

// 解析本页面的url以及参数
debugger
// 获取返回的url对象的query属性值
const args = url.parse(document.location.href, true).query

let globalToken = ''
if ((args !== null) && (args.token !== null)) {
  // 外部token，保存到常量 externToken
  const externToken = args.token
  console.log('!!! 外部传入的token: ' + externToken)

  debugger

  // 初始化vue的token
  // this.$cookie.set('token', data.token)
  globalToken = externToken
}

// ====================================================================================================================

Vue.use(VueCookie)

// 初始化vue的 ??? 对吗这样做
Vue.cookie.set('token', globalToken)

Vue.config.productionTip = false

// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

debugger
// 初始化外部token
vm.$cookie.set('token', globalToken)

console.log(vm.$cookie.get('token'))

debugger
