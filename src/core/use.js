import Vue from 'vue'
import VueStorage from 'vue-ls'

//import loading from 'components/common/loading.vue'
//import tableNodata from 'components/common/tableNodata.vue'
import headline from '@/components/headline/index.vue'
import pagination from '@/components/pagination/index.vue'
//import absButton from 'components/common/components/absButton'

Vue.use(VueStorage, {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],  Vue名称变量。(ls)或($ ls)
  storage: 'local' // storage name session, local, memory  存储名称会话、本地、内存
})

//Vue.component('loading', loading)
//Vue.component('tableNodata', tableNodata)
Vue.component('titleAnt', headline)
Vue.component('pagination', pagination)
//Vue.component('absButton', absButton)
