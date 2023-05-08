<template>
    <div class="docker">
        <div
            v-for="(item, index) in dockerList"
            :class="{ 'docker__item': true, 'docker__item--active': index === currentIndex }"
            :key="item.icon">
            <router-link :to="item.to">
                <div class="iconfont" v-html="item.icon" />
                <div class="docker__title">{{ item.text }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe8b9;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe6bc;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe713;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe78b;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>
<!-- scoped 表示样式只对本组件内的 class 标签有用 -->
<style lang="scss" scoped>
@import '../style/viriables.scss';
@import '../style/mixins.scss';

.docker {
    display: flex;
    box-sizing: border-box;
    position: absolute;
    padding: 0 .18rem;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .49rem;
    border-top: .01rem solid $content-bgColor;
    // color: $content-font-color;

    &__item {
        flex: 1;
        text-align: center;

        a{
            color: $content-font-color;
            text-decoration: none;
        }
        .iconfont {
            margin: .07rem 0 .02rem 0;
            font-size: .18rem;
        }

        &--active {
            a{
                color: #1FA4FC;
            }
        }
    }

    &__title {
        font-size: .1rem;
    }
}
</style>
