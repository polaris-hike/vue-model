import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { get, post, del, put } from './utils/http';
import {Switch,  Pagination,  Dialog ,Transfer,Message} from "element-ui";
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Transfer);
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$del = del;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
