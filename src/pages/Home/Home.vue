<template>
  <section class="home">
    <!--首页头部(利用插槽占位来显示标题以及添加左右两侧小图标)-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id?'/userInfo':'/login'">
            <span class="header_login_text" v-if="!userInfo._id">
              登录|注册
            </span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-person"></i>
            </span>
      </router-link>
    </HeaderTop> <!--利用vuex的mapstate映射数据到首页,然后v-model绑定数据即可实现异步显示-->
    <!--首页导航-->
    <nav class="home_nav">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index"> <!--此处categorys表示轮播图页数 -->
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index"> <!--此处category表示每页轮播图中元素个数,合起来就是一个二维数组-->
              <div class="food_container"> <!--这个盒子用来存放食品分类的icon-->
                <img :src="BaseImageUrl+category.image_url" alt="">
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="home_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
    </div>
    <!-- 异步获取商家列表渲染到浏览器页面 -->
    <ShopList/>
  </section>
</template>

<script>
import {mapState} from 'vuex'
// 引入swiper轮播库
import Swiper from 'swiper'
// 引入轮播插件
import 'swiper/css/swiper.min.css'
// 引入各页面头部组件
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
// 引入商家列表组件
import ShopList from '../../components/ShopList/ShopList.vue'

export default {
  components: {
    // 注册组件
    HeaderTop,
    ShopList
  },
  data () {
    return {
      BaseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    // mounted钩子专门用于发送ajax请求
    // 请求食品分类
    this.$store.dispatch('getCategorys')
    // 请求商家列表
    this.$store.dispatch('getShops')
  },
  computed: {
    // 使用mapstate将state中的属性映射到Home
    ...mapState(['address', 'categorys', 'userInfo']),
    /*
     根据categorys一维数组生成一个2维数组,
     小数组中的元素个数最大是8
      */
    categorysArr () {
      // 定义小数组最大长度
      const max = 8
      // 定义一个空的大数组(轮播图页数)
      const arr = []
      // 解构赋值取出categorys
      const {categorys} = this
      // 定义一个空的小数组
      let smallArr = []
      // 遍历categorys
      categorys.forEach((c, index) => {
        if (smallArr.length === 0) {
          // 如果小数组元素为0,则添加至大数组中
          arr.push(smallArr)
        }
        // 往小数组添加categorys元素,并判断是否填满(8),填满了重新创建一个空的小数组
        smallArr.push(c)
        if (smallArr.length === max) {
          smallArr = []
        }
      })
      return arr
    }
  },
  watch: {
    // 监视categorys是否发生变化, 有变化则执行相应callback函数
    categorys (value) {
      // 在$nextTick中实现轮播可以让页面加载了再轮播
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          // 分页器 即下方小圆点
          pagination: {
            el: '.swiper-pagination'
          },
          // 是否循环轮播
          loop: true
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.home //首页
  width 100%

  .header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px

    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%

      .icon-sousuo
        font-size 25px
        color #fff

    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center

      .header_title_text
        font-size 20px
        color #fff
        display block

    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)

      .header_login_text
        color #fff

  .home_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff

    .swiper-container
      width 100%
      height 100%

      .swiper-wrapper
        width 100%
        height 100%

        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap

          .link_to_food
            width 25%

            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0

              img
                display inline-block
                width 50px
                height 50px

            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666

      .swiper-pagination
        > span.swiper-pagination-bullet-active
          background #02a774

  .home_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff

    .shop_header
      padding 10px 10px 0

      .shop_icon
        margin-left 5px
        color #999

      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>
