import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Switch,  Pagination,  Dialog} from "element-ui";
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
