import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index/Index.vue')
  },
  {
    path: '/alarm',
    name: 'alarm',
    component: () => import(/* webpackChunkName: "Alarm" */ '../views/Alarm/Alarm.vue')
  },
  {
    path: '/dataOverview',
    name: 'dataOverview',
    component: () => import(/* webpackChunkName: "DataOverview" */ '../views/DataOverview/DataOverview.vue')
  },
  {
    path: '/device',
    name: 'device',
    component: () => import(/* webpackChunkName: "Device" */ '../views/Device/Device.vue')
  },
  {
    path: '/system',
    name: 'system',
    component: () => import(/* webpackChunkName: "about" */ '../views/System/System.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
