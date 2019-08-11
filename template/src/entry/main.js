/**
 * 主应用入口文件
 */

import Vue from 'vue'
import App from 'views/app'
import '../css/index.styl'
{{#baobabui}}
// 引入内部组件库
import 'baobab-ui/lib/baobab-ui.css'
import BaobabUI from 'baobab-ui'
Vue.use(BaobabUI)
{{/baobabui}}
{{#fastclick}}
// 引入fastclick
import FastClick from 'fastclick'
FastClick.attach(document.body)
FastClick.prototype.focus = (el) => {
  el.focus()
}
{{/fastclick}}
{{#router}}
// 引入vue-router
import router from '../router'
// 设置全局守卫
router.beforeEach((to, from, next) => {
  // ...
  next()
})
{{/router}}

window.app = new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  ...App
})
