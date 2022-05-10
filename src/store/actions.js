/* 通过mutation间接更新state多个方法对象 */
import {
  // 引入接口请求函数
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShop
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
  // async函数异步获取地址 await右为返回的成功的promise结果
  async getAddress({ commit, state }) {
    // 定义一个经纬度坐标geohash
    const geohash = state.latitude + ',' + state.longitude
    // 接受异步请求返回的商家坐标值
    const result = await reqAddress(geohash)
    // commit RECEIVE_ADDRESS方法和坐标数据交给mutations处理
    commit(RECEIVE_ADDRESS, { address: result.data })
  },
  // 异步获取分类列表
  async getCategorys({ commit }) {
    const result = await reqFoodCategorys()
    commit(RECEIVE_CATEGORYS, { categorys: result.data })
  },
  // 异步获取商家列表
  async getShops({ commit, state }) {
    // 利用解构赋值将经纬度数据从state对象中取出
    const { latitude, longitude } = state
    const result = await reqShops({ latitude, longitude })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  // 同步记录用户信息 这里 userInfo是个形参 等价于login组件中保存的user
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  // 异步获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },
  // 异步登出
  async logout({ commit }) {
    // 异步请求退出登录(向后端接口请求结果)
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商家信息
  async getShopInfo({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, { info })
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({ commit },callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      // 不通知无法滑动
      callback && callback()
    }
  },
  // 异步获取商家商品列表
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      callback && callback()
    }
  },
  // 同步更新food中的count值
  updateFoodCount({ commit }, { food, isAdd }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },
  // 同步清空购物车
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },

  // 异步搜索
  async searchShops({ commit, state }, keyword) {

    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash,keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  },
}
