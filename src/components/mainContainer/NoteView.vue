<template>
  <div>
    <div class="closeBox" v-if="visible" @click="visible = !visible">
      <a-icon type="close"></a-icon>
    </div>
    <a-modal
      v-model="visible"
      @ok="handleOk"
      :footer="false"
      :closable="false"
      :zIndex="998"
      width="1200px"
    >
      <div class="viewBox">
        <p v-html="domStr"></p>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      domStr: ""
    };
  },
  methods: {
    handleOk() {
      this.visible = false;
    }
  }
};
</script>

<style scoped lang="less">
.viewBox {
  /deep/ img {
    max-width: 1000px;
  }
}

.closeBox {
  position: fixed;
  top: 200px;
  right: 10px;
  width: 48px;
  height: 48px;
  background-color: white;
  color: #1890ff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
  z-index: 1000;
}
</style>
