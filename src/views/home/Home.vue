<template>
    <!-- BEM命名规则
    block__element--Modifier -->
    <div>
      <div class="wrapper">
        <StaticPart />
        <Nearby />
    </div>
    <Docker :currentIndex = '0'/>
    </div>
  </template>
<script>
import Nearby from './Nearby.vue'
import StaticPart from './StaticPart.vue'
import Docker from '../../components/Docker.vue'
export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker }
}
</script>

<!-- scoped 表示样式只对本组件内的 class 标签有用 -->
  <style lang="scss" scoped>
 @import '../../style/mixins.scss';
  .wrapper {
    overflow-y: auto;
    // position: absolute;
    // left: 0;
    // top: 0;
    // bottom: .5rem;
    // right: 0;
    @include fix-content;
    padding: 0 .18rem .2rem .18rem;
    // background: green;
  }
  </style>
