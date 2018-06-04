// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import net from '@/net/net'
import util from "@/util/util"
import loading from '@/util/loading'

Vue.config.productionTip = false

Vue.use(ElementUI, {locale})

Vue.prototype.$net = net;
Vue.prototype.$activity = loading;
Vue.prototype.$util = util;
/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

loading.setVue(vm);