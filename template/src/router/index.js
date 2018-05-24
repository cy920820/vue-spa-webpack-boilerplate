/*
  将路由统一管理
*/

import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'views/hello'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Hello
  }
]

export default new Router({ routes })
