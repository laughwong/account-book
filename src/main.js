import Vue from 'vue'
import Antd from 'ant-design-vue'
import Home from './Home.vue'
import 'ant-design-vue/dist/antd.css'
import store from './store/store.js'


Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  render: h => h(Home),
  store
}).$mount('#app')
