<template>
  <div>
    <MenuPath />
    <div id="components-form-demo-advanced-search">
      <a-form
        class="ant-advanced-search-form"
        :form="form"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col :span="6" :style="{ display: 'block' }">
            <a-form-item label="主标题">
              <a-input v-decorator="['offTitle']" placeholder="请输入标题" />
            </a-form-item>
          </a-col>
          <a-col :span="6" :style="{ display: 'block' }">
            <a-form-item label="副标题">
              <a-input v-decorator="['subTitle']" placeholder="请输入标题" />
            </a-form-item>
          </a-col>
          <a-col :span="6" :style="{ display: 'block' }">
            <a-form-item label="标签">
              <a-tree-select
                :tree-data="treeData"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="Please select"
                allow-clear
                multiple
                v-decorator="['labelList']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6" :style="{ display: 'block' }">
            <a-form-item label="发布日期">
              <a-range-picker
                style="width: 100%"
                v-decorator="['publishDate']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
              Search
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              Clear
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="search-result-list">
        <ArticleTable />
      </div>
    </div>
  </div>
</template>

<script>
import MenuPath from "../../components/mainContainer/MenuPath";
import ArticleTable from "../../components/mainContainer/ArticleTable";
export default {
  components: {
    MenuPath,
    ArticleTable
  },
  data() {
    const labelData = JSON.parse(sessionStorage.getItem("labelList"));
    return {
      // expand: false,
      form: this.$form.createForm(this),
      treeData: labelData
    };
  },
  methods: {
    handleSearch(e) {
      const { $store, form } = this;
      e.preventDefault();
      form.validateFields((error, values) => {
        const publishDate = values["publishDate"];
        if (typeof publishDate != "undefined" && publishDate.length > 0) {
          values = {
            ...values,
            startTime: publishDate[0].format("YYYY-MM-DD") + " 00:00:00",
            endTime: publishDate[1].format("YYYY-MM-DD") + " 23:59:59"
          };
        }
        if (!error) {
          $store.dispatch({
            type: "note/searchNote",
            condition: { ...values, type: 1 }
          });
          this.$message.info("success!");
        }
      });
    },

    handleReset() {
      this.form.resetFields();
    }

    // toggle () {
    //   this.expand = !this.expand;
    // }
  }
};
</script>

<style scoped lang="less">
#components-form-demo-advanced-search {
  /deep/.ant-form {
    max-width: none;
  }

  /deep/.ant-advanced-search-form {
    padding: 24px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;

    /deep/.ant-form-item {
      display: flex;
    }
    /deep/ .ant-form-item-control-wrapper {
      flex: 1;
    }
  }

  /deep/ .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
}
</style>
