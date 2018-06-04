/*
  将路由统一管理
*/

import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'views/hello'
import NotFount from 'views/404'

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
