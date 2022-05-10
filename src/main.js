/*
  入口js
*/
import Vue from 'vue'
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/mockSever' // 加载mockSever即可
import loading from './common/imgs/loading.gif'
import './filters' // 加载过滤器

// 注册全局组件标签
Vue.component(Button.name, Button) // 则<mt-button>可全局使用
Vue.use(VueLazyload, { // 内部自定义了一个指令Lazy
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用vue-router
  store // 使用vuex
})
