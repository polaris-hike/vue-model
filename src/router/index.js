import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/Login.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index/Index.vue')
  },
  {
    path: '/alarmManage',
    name: 'alarmManage',
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
    component: () => import(/* webpackChunkName: "about" */ '../views/System/System.vue'),
    redirect:'/system/units',
    children:[
      {
        path: 'units',
        name: 'units',
        component:  () => import(/* webpackChunkName: "units" */ '../views/System/components/units.vue'),
      },
      {
        path: 'user',
        name: 'user',
        component:  () => import(/* webpackChunkName: "user" */ '../views/System/components/user.vue'),
      },
      {
        path: 'role',
        name: 'role',
        component:  () => import(/* webpackChunkName: "role" */ '../views/System/components/role.vue'),
      },
      {
        path: 'dictionary',
        name: 'dictionary',
        component:  () => import(/* webpackChunkName: "dictionary" */ '../views/System/components/dictionary.vue'),
      },
      {
        path: 'alarmSetting',
        name: 'alarmSetting',
        component:  () => import(/* webpackChunkName: "alarm" */ '../views/System/components/alarm.vue'),
      },
    ]

  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
export default router
