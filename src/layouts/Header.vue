<template>
  <div class="header" @click="logout">
    <a-icon type="logout" style="font-size:24px" />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.replace("/user/login");
    }
  }
};
</script>

<style scoped lang="less">
.header {
  float: right;
  margin-right: 40px;
}
.header:hover {
  cursor: pointer;
}
</style>
