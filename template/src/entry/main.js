/**
 * 主应用入口文件
 */

import Vue from 'vue'
import App from 'views/app'
{{#router}}
import router from '../router'
{{/router}}

{{#baobabui}}
import 'baobab-ui/lib/baobab-ui.css'
import BaobabUI from 'baobab-ui'
Vue.use(BaobabUI)
{{/baobabui}}

{{#fastclick}}
import FastClick from 'fastclick'
FastClick.attach(document.body)
{{/fastclick}}

window.app = new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  ...App
})
