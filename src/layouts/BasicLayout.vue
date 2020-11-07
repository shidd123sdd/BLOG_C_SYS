<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider :trigger="null" collapsible width="256px">
        <div class="logo">Blog Manage System</div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
export default {
  name: "BasicLayout",
  // beforeCreate () {
  //   const { $store } = this;
  //   $store.dispatch({
  //     type: "label/getLabelList"
  //   });
  // },
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Header,
    Footer,
    SiderMenu
  }
};
</script>

<style scoped lang="less">
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  color: white;
  font-size: 20px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark .logo {
  color: #ffffff;
}
</style>
