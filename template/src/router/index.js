/*
  将路由统一管理
*/

import Vue from 'vue'
import Router from 'vue-router'
// 异步组件结合webpack code-split实现路由懒加载
const Hello = () => import(/* webpackChunkName: "Hello" */ 'views/hello')
const NotFount = () => import(/* webpackChunkName: "NotFount" */ 'views/404')

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Hello
  },

  {
    path: '*',
    component: NotFount
  }
]

export default new Router({
  routes,
  // add scrollBehavior
  scrollBehavior(to, from, savedPosition){
    // return desired position
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
