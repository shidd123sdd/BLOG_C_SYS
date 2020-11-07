<template>
  <div class="container">
    <div class="imgCover"></div>
    <div class="box">
      <div class="top">
        <div class="header">
          <img src="../assets/logo.png" />
          <span>Manage System</span>
        </div>
        <div class="desc">来自一个小白的知识搬运</div>
      </div>
      <router-view ref="userInfo"></router-view>
      <div class="autoLogin">
        <div class="switch">
          <a-switch default-checked>
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
          自动登录
        </div>
        <div class="forget">忘记密码</div>
        <div class="clear"></div>
      </div>
      <div class="loginBt">
        <a-button type="primary" :block="block" @click="submit">
          登录
        </a-button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
export default {
  components: {
    Footer
  },
  data() {
    return {
      block: true
    };
  },
  methods: {
    submit() {
      const username = this.$refs.userInfo.username;
      const password = this.$refs.userInfo.password;
      const { $store } = this;

      $store.dispatch({
        type: "user/submitLogin",
        userInfo: { username, password }
      });
    }
  }
};
</script>

<style scoped lang="less">
.clear {
  clear: both;
}
.container {
  width: 100%;
  height: 100%;
  background: url("../images/user/bg2.jpg") no-repeat left 50%;
  background-size: 100%;
  position: absolute;
  background-size: cover;
  padding: 160px 0 144px;
  box-sizing: border-box;

  .imgCover {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    top: 0;
    left: 0;
    opacity: 0.4;
  }
  .box {
    position: relative;
    width: 500px;
    height: 580px;
    margin: auto;
    background-color: rgba(255, 247, 247, 0.65);
    box-shadow: 10px 10px 5px #888888;

    .loginBt {
      width: 300px;
      margin: auto;
      margin-top: 50px;
      height: 60px;
      .ant-btn {
        height: 40px;
        border-radius: 0;
      }
    }

    .autoLogin {
      width: 300px;
      margin: auto;
      margin-top: 30px;
      .switch {
        float: left;
        font-size: 14px;
      }
      .forget {
        float: right;
        font-size: 14px;
        color: #1890ff;
        font-weight: 500;
        cursor: pointer;
      }
    }
    .top {
      width: 100%;
      text-align: center;
      .header {
        padding-top: 50px;
        text-align: center;
        vertical-align: middle;
        img {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }
        span {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
          font-weight: 600;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.75);
        margin-top: 12px;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
