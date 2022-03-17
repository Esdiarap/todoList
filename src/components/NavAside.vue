<template>
  <!-- Logo -->
  <div class="logo-box">
    <img class="logo" src="@/assets/logo.png" alt="Logo"/>
  </div>
  <!-- 用户信息 -->
  <div class="user-box">
    <!-- 头像 -->
    <div class="profile">U</div>
    <!-- 用户名 -->
    <p class="username">User Name</p>
  </div>
  <router-link
      class="nav"
      v-for="(route, index) in routers"
      :to="route.target"
      :key="index"
      active-class="active-router"
  >
    <!--<img class="logo" :src="require(`./assets/images/${route.imgName}`)" alt="logo">-->
    <img class="router-logo" :src="route.imgUrl" alt="logo">
    <span class="router-describe">{{ route.value }}</span>
    <!--<span>{{ `./assets/images/${route.imgName}` }}</span>-->
  </router-link>
</template>

<script>
import {reactive} from "vue";


export default {
  name: "NavAside",
  setup() {
    const routers = reactive([
      {target: '/', value: '我的待办', imgUrl: require('../assets/images/list.png')},
      {target: '/dashboard', value: '数据统计', imgUrl: require('../assets/images/shujutongji.png')},
      {target: '/setting', value: '设置', imgUrl: require('../assets/images/shezhi.png')},
      {target: '/about', value: '关于我', imgUrl: require('../assets/images/guanyu.png')}
    ])
    return {
      routers
    }
  }
}
</script>

<style scoped lang="scss">
$aside-item-hover-background: rgba(15, 23, 42, 0.04);
$checked-color: #eff6ff;
.logo-box {
  display: flex;
  // 居中
  align-items: center;
  //justify-content: center;

  width: 100%;
  height: 3.5rem;

  // 往下推一点
  margin-top: 3rem;

  .logo {
    max-width: 3rem;
    max-height: 3rem;
  }
}

.user-box {
  display: flex;
  align-items: center;
  // 上下推一点
  margin: 2rem 0 1.5rem 0;

  width: 100%;
  height: 3rem;
  border-radius: 6px;
  /* 头像 */
  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1rem 0 0.5rem;
    width: 2rem;
    height: 2rem;
    color: blanchedalmond;
    border-radius: 50%;
    background-color: powderblue;
  }

  /* 用户名 */
  .username {
    color: black;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
  }

  &:hover {
    background-color: $aside-item-hover-background;
  }
}

// 路由按钮
.nav {
  display: flex;
  align-items: center;
  height: 3rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  cursor: pointer;
  // 调整字体
  text-decoration: none;
  color: black;
  letter-spacing: .5px;

  &:hover {
    background-color: $aside-item-hover-background;
  }

  .router-logo {
    margin: 0 1rem 0 0.5rem;
    width: 2rem;
    height: 2rem;
  }

  .router-describe {
    color: black;
    font-size: .8rem;
    font-weight: 600;
    line-height: 1.5rem;
  }
}

.active-router{
  background-color: $aside-item-hover-background;
}
</style>
