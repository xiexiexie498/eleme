/*
路由器模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../pages/Home/Home.vue'
// import Order from '../pages/Order/Order.vue'
// import Search from '../pages/Search/Search.vue'
// import Profile from '../pages/Profile/Profile.vue'
// 实现路由懒加载
const Home = () => import ('../pages/Home/Home.vue')
const Order = () => import ('../pages/Order/Order.vue')
const Search = () => import ('../pages/Search/Search.vue')
const Profile = () => import ('../pages/Profile/Profile.vue')


import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    // 默认路由为home
    {
      path: '/',
      redirect: '/home'
    },
    // 主页路由
    {
      path: '/home',
      component: Home, // 懒加载后 返回的是路由组件的函数,只有执行次函数才会加载路由组件,函数在请求对应路由路径时才会执行
      meta: {
        showFooter: true
      }
    },
    // 搜索路由
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    // 订单路由
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    // 个人中心路由
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    // 登录路由
    {
      path: '/login',
      component: Login
    },
    // 商家路由
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '',
          redirect: '/shop/goods'
        },
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        }
      ]
    }
  ]
})
