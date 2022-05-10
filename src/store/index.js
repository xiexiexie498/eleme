/* vuex最核心的管理对象store */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 使用vuex插件
Vue.use(Vuex)

// 创建store管理对象并暴露
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
