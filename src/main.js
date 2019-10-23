import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import './core/use'
import './core/element/index.js'
import ku from './utils/vueInstallStore'
import App from './App'
import store from './store'
import router from './router'

import '@/styles/index.scss' // global css

import '@/icons' // icon
import '@/permission' // permission control
Vue.use(ku)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }
// console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })

// 本地环境
// window.absContext = (window.location.port === '6565' ? 'http://localhost:9092' : '') + '/abs-gateway/abs'
// window.absContextDuration = (window.location.port === '6565' ? 'http://localhost:9092' : '') + '/abs-gateway/abs-duration'
// window.absContextPro = (window.location.port === '6565' ? 'http://localhost:9092' : '') + '/abs-gateway/abs-product'
// window.absContextDurationV2 = (window.location.port === '6565' ? 'http://localhost:9092' : '') + '/abs-gateway/abs-durationV2'
// window.absContextPrivilege = (window.location.port === '6565' ? 'http://localhost:9092' : '') + '/abs-gateway/abs-privilege'

// 测试环境
window.absContext = (window.location.port === '9528' ? 'https://abstest.tenpay.com/abs-gateway/abs' : '')
window.absContextDuration = (window.location.port === '9528' ? 'https://abstest.tenpay.com/abs-gateway/abs-duration' : '')
window.absContextPro = (window.location.port === '9528' ? 'https://abstest.tenpay.com/abs-gateway/abs-product' : '')
window.absContextDurationV2 = (window.location.port === '9528' ? 'https://abstest.tenpay.com/abs-gateway/abs-durationV2' : '')
window.absContextPrivilege = (window.location.port === '9528' ? 'https://abstest.tenpay.com/abs-gateway/abs-privilege' : '')

// 开发环境
// window.absContext = (window.location.port == '6565' ? 'https://absdev.tenpay.com/abs-gateway/abs' : '')
// window.absContextDuration = (window.location.port == '6565' ? 'https://absdev.tenpay.com/abs-gateway/abs-duration' : '')
// window.absContextPro = (window.location.port == '6565' ? 'https://absdev.tenpay.com/abs-gateway/abs-product' : '')
// window.absContextDurationV2 = (window.location.port == '6565' ? 'https://absdev.tenpay.com/abs-gateway/abs-durationV2' : '')
// window.absContextPrivilege = (window.location.port == '6565' ? 'https://absdev.tenpay.com/abs-gateway/abs-privilege' : '')

// 生产环境
// window.absContext = (window.location.port === '6565' ? 'https://abs.tenpay.com/abs-gateway/abs' : '')
// window.absContextDuration = (window.location.port === '6565' ? 'https://abs.tenpay.com/abs-gateway/abs-duration' : '')
// window.absContextPro = (window.location.port === '6565' ? 'https://abs.tenpay.com/abs-gateway/abs-product' : '')
// window.absContextDurationV2 = (window.location.port === '6565' ? 'https://abs.tenpay.com/abs-gateway/abs-durationV2' : '')
// window.absContextPrivilege = (window.location.port === '6565' ? 'https://abs.tenpay.com/abs-gateway/abs-privilege' : '')

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
