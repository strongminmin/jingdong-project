<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe61f;</span>
    北京理工大学国防科技部园2号楼10层
    <span class="iconfont position__notice">&#xe60d;</span>
  </div>
  <router-link to="/search">
    <div class="search">
      <span class="iconfont">&#xe6b9;</span>
      <span class="search__text">山姆会员商店优惠商品</span>
    </div>
  </router-link>
  <div class="banner">
    <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" />
  </div>
  <div class="icons">
    <div v-for="item in iconList" class="icons__item" :key="item.id">
      <img :src="item.imgUrl" alt="" class="icons__item__img">
      <!-- <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" alt="" class="icons__item__img"> -->
      <p class="icons__item__desc">{{ item.text }}</p>
    </div>

  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      // {imgName:'超市', text:'超市便利'},
      {
        id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        text: '超市便利'
      }, {
        id: 2,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png',
        text: '菜市场'
      }, {
        id: 3,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png',
        text: '水果店'
      }, {
        id: 4,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png',
        text: '鲜花绿植'
      }, {
        id: 5,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png',
        text: '医药健康'
      }, {
        id: 6,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png',
        text: '家居时尚'
      }, {
        id: 7,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png',
        text: '烘焙蛋糕'
      }, {
        id: 8,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png',
        text: '签到'
      }, {
        id: 9,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png',
        text: '大牌免运'
      }, {
        id: 10,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png',
        text: '红包套餐'
      }

    ]
    return { iconList }
  }
}
</script>

<!-- scoped 表示样式只对本组件内的 class 标签有用 -->
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.position {
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  @include ellipsis;

  .position__icon {
    position: relative;
    top: .01rem;
    font-size: .2rem;
  }

  .position__notice {
    position: absolute;
    top: .17rem;
    right: 0;
    font-size: .2rem;
  }

  color: $content-fontColor;
}

.search {
  margin-bottom: .12rem;
  line-height: .32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: .16rem;

  .iconfont {
    position: relative;
    display: inline-block;
    padding: 0 .1rem 0 .16rem;
    top: .02rem;
    font-size: .2rem;
  }

  &__text {
    display: inline-block;
    font-size: .14rem;
  }
}

.banner {
  height: 0;
  overflow: hidden;
  // 解决图像下面内容抖动的问题
  // 25.4% 是 图像的宽度 除以 图像的长度 的值
  padding-bottom: 25.4%;

  &__img {
    width: 100%;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;

  &__item {
    width: 20%;

    &__img {
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }

    &__desc {
      padding: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontColor;
    }

  }
}

.gap {
  height: .1rem;
  background: $content-bgColor;
  margin: 0 -.18rem;
}
</style>
