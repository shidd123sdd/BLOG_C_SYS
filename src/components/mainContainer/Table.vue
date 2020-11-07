<template>
  <div class="tableBox">
    <div class="buttonsBox">
      <a-button type="primary" @click="showModal">
        添加
      </a-button>
      <LabelModel
        :visible="visible"
        @closeModel="closeModel"
        :labelInfo="form"
        :selectedIds="selectedIds"
        :isUpdate="isUpdate"
      />
      <a-input-search
        placeholder="input search text"
        enter-button
        @search="onSearch"
      />
      <div class="clear"></div>
    </div>
    <a-table
      :columns="columns"
      :data-source="datas"
      :bordered="true"
      :loading="loading"
    >
      <template slot="action" slot-scope="text, record">
        <a class="actions" @click="update(text, record)">修改</a>

        <a-popconfirm
          title="请确认是否删除该标签"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm(text, record)"
          @cancel="cancel"
        >
          <a class="actions" v-if="record.children == null">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
import LabelModel from "./LabelModel";

export default {
  beforeCreate() {
    const { $store } = this;
    $store.dispatch({
      type: "label/getLabelList"
    });
  },
  components: {
    LabelModel
  },
  data() {
    return {
      loading: true,
      visible: false,
      form: undefined,
      selectedIds: [],
      datas: [],
      isUpdate: false
    };
  },
  computed: {
    columns() {
      let labelColumn = this.$store.state.label.labelColumnList;
      let options = {
        title: "操作",
        dataIndex: "",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "action" }
      };
      labelColumn.push(options);
      return labelColumn;
    }
  },
  watch: {
    "$store.state.label.labelList": function(val) {
      this.datas = val;
      this.loading = false;
    }
  },
  methods: {
    update(text, record) {
      this.visible = true;
      const values = this.familyTree(this.datas, record.id);
      this.form = record;
      this.selectedIds = values;
      this.isUpdate = true;
    },
    deleteRecord(text, record) {
      const id = record.id;
      const { $store } = this;
      $store.dispatch({
        type: "label/deleteLabel",
        id: id
      });
    },
    onSearch(value) {
      this.$store.dispatch({
        type: "label/searchLabel",
        data: value
      });
    },
    showModal() {
      this.visible = true;
    },
    closeModel() {
      this.visible = !this.visible;
    },
    confirm(text, record) {
      this.deleteRecord(text, record);
    },
    cancel() {},
    familyTree(arr1, id) {
      var temp = [];
      var forFn = function(arr, id) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (item.id === id) {
            if (item.parentLabelId) {
              temp.push(item.parentLabelId);
            }
            forFn(arr1, item.parentLabelId);
            break;
          } else {
            if (item.children) {
              forFn(item.children, id);
            }
          }
        }
      };
      forFn(arr1, id);
      let len = temp.length;
      let res = [];
      for (let i = 0; i < len; i++) {
        res[i] = temp[len - i - 1];
      }
      return res;
    }
  }
};
</script>

<style scoped lang="less">
.tableBox {
  background-color: white;

  .buttonsBox {
    padding: 20px;

    /deep/.ant-input-search {
      width: 400px;
      float: right;
    }

    button {
      margin-left: 10px;
      float: right;
    }

    .clear {
      clear: both;
    }
  }

  .actions {
    margin: auto 10px;
  }
  /deep/ .ant-table-thead > tr > th {
    text-align: center;
  }
  /deep/ .ant-table-wrapper {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
