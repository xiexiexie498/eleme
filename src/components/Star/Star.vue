<template>
  <div class="star" :class="'star-'+size">
    <!--在一个数组里面遍历星星数组,通过v-model动态绑定星星的类-->
    <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
// 类名常量
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  name: 'Star',
  props: {
    score: Number,
    size: Number
  },
  computed: {
    /*
    3.2: 3+0+2 全+半+灰
    3.5: 3+1+1
    */
    // 封装一个starClasses函数, 返回一个评分相关的数组
    starClasses () {
      const {score} = this
      const scs = []
      // 向scs中添加 n 个CLASS_ON
      // 取出分数的整数部分
      const scoreInteger = Math.floor(score)
      // 整数部分就是 star_on的个数 因此需要遍历并添加
      for (let i = 0; i < scoreInteger; i++) {
        scs.push(CLASS_ON)
      }
      // 向scs中添加 0/1 个CLASS_HALF
      // half只能有一个或者0个 获取score小数部分 >5就添加 <5就不添加
      if (score * 10 - scoreInteger * 10 >= 5) {
        scs.push(CLASS_HALF)
      }
      // 向scs中添加 n 个CLASS_OFF
      // 只有当scs中的数组长度小于5才能进入while循环 等于5时循环结束
      while (scs.length < 5) {
        scs.push(CLASS_OFF)
      }
      return scs
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/mixins.styl"
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/star48_on')
      &.half
        bg-image('./images/star48_half')
      &.off
        bg-image('./images/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star36_on')
      &.half
        bg-image('./images/star36_half')
      &.off
        bg-image('./images/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star24_on')
      &.half
        bg-image('./images/star24_half')
      &.off
        bg-image('./images/star24_off')
</style>
