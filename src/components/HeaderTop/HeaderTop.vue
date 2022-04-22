/*这是个插槽组件*/
<template>
  <header class="header">
          <slot name="left"></slot>
          <span class="header_title">
            <span class="header_title_text ellipsis">{{ title }}</span>
          </span>
          <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  name: 'HeaderTop',
  props: {
    title: String
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
