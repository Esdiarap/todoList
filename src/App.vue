<template>
  <div id="app">
    <!--侧边栏-->
    <aside>
      <nav-aside></nav-aside>
    </aside>
    <!--右边主要-->
    <main>
      <!--上面搜索栏-->
      <div class="top-bar">
        <top-bar></top-bar>
      </div>
      <!--router-view-->
      <div class="view">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import NavAside from "@/components/NavAside";
import TopBar from "@/components/TopBar";
// import {ref} from "vue";
export default {
  name: 'App',
  components: {NavAside, TopBar},
  setup() {

    return {

    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  background-color: #bfa;
  display: flex;
  overflow: auto;
}
</style>

<style scoped lang="scss">
$main-background-color: #f5edee;
$aside-background: rgb(245, 245, 245);
aside {
  width: 235px;
  background-color: $aside-background;
  // 往里面挤一点
  padding: 0 20px;
  // 溢出
  overflow: auto;
}

main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  //background-color: $main-background-color;
  background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  overflow: auto;

  .top-bar {
    flex: 0 0 6rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 48.5rem;
  }

  .view {
    flex: 1 1 auto;
    overflow: auto;
  }
}
</style>
