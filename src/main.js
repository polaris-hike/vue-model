import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { get, post, del, put } from './utils/http';
import tableComponent from "./components/tableComponent";
import VueTouch from 'vue-touch'

Vue.use(VueTouch, {name: 'v-touch'})

import {
  Switch, Pagination, Dialog, Transfer, Message, Select, Option,Checkbox,DatePicker,Alert,Popconfirm
} from "element-ui";
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Transfer);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Alert);
Vue.use(Popconfirm);


Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$del = del;
Vue.component('table-component',tableComponent)

let vm=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach(((to, from, next) => {
  if (!localStorage.getItem("token")) {
	if (to.path !== '/login') {
	  return next('/login')
	}
  }
  next()
  
}))