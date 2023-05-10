<template lang="">
    <div class="wrapper">
        <div class="title">
          我的地址
          <span class="title__create">新建</span>
        </div>
    </div>
    <Docker :currentIndex = '3'/>
</template>
<script>
import Docker from '../../components/Docker.vue'

export default {
  name: 'Address',
  components: { Docker },
  setup () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper {
  overflow-y: auto;
  // position: absolute;
  // left: 0;
  // top: 0;
  // bottom: .5rem;
  // right: 0;
  @include fix-content;
  background: $darkBgColor;
  // padding: 0 .18rem .2rem .18rem;
  // background: green;
}

.title {
  position: relative;
  // line-height: .44rem;
  // background: $bgColor;
  // color: $content-fontColor;
  // font-size: .16rem;
  // text-align: center;
  @include title;
  &__create {
    position: absolute;
    right: .18rem;
    font-size: .14rem;
    color: $content-fontColor;
  }
}
</style>
