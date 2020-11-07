<template>
  <div class="menuPath">
    {{ menuPath }}<span class="split"> > </span>{{ this.$route.meta.title }}
  </div>
</template>

<script>
import parentPathTitle from "../../utils/parentPathTitle";

export default {
  computed: {
    menuPath() {
      const currRoute = this.$route;
      return parentPathTitle(this.$router.options.routes, currRoute);
    }
  }
};
</script>

<style scoped lang="less">
.menuPath {
  margin: 20px 0;
  font-size: 14px;
  .split {
    font-size: 20px;
  }
}
</style>
