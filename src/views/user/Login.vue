<template>
  <div class="logBox">
    <a-tabs
      default-active-key="1"
      @change="callback"
      style=" text-align: center;"
    >
      <a-tab-pane key="1" tab="账号密码登录">
        <div class="components-input-demo-presuffix">
          <a-input
            size="large"
            ref="userNameInput"
            v-model="username"
            placeholder="username"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0,0,0,.45);font-size:20px"
            />
            <!-- <a-tooltip slot="suffix" title="Extra information">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
            </a-tooltip> -->
          </a-input>
          <a-input
            v-model="password"
            placeholder=" password"
            :type="isVisable ? 'password' : 'text'"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0,0,0,.45);font-size:20px"
            />
            <a-icon
              slot="suffix"
              :type="isVisable ? 'eye-invisible' : 'eye'"
              style="color: rgba(0,0,0,.45);font-size:20px;cursor:pointer"
              @click="changeVisable"
            />
          </a-input>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="手机号登录" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "admin",
      password: "",
      isVisable: true
    };
  },
  methods: {
    changeVisable() {
      this.isVisable = !this.isVisable;
    }
  }
};
</script>

<style scoped lang="less">
.logBox /deep/ .ant-tabs-nav-container {
  font-size: 16px;
}

.ant-input-affix-wrapper {
  width: auto;
}
.components-input-demo-presuffix /deep/ .ant-input {
  height: 40px;
  width: 300px;
  margin: 15px auto;
}

.components-input-demo-presuffix /deep/ .ant-input-lg {
  height: 40px;
  padding: 10px 40px;
  font-size: 14px;
}
</style>
