<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <span slot="labelListIds" slot-scope="labelListIds">
        <a-tag v-for="tag in labelListIds" :key="tag" :color="randomColor()">
          {{ tag }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="showModel(text, record)">预览</a>
        <a @click="toUpdate(text, record)" class="actions">修改</a>
        <a-popconfirm
          title="Are you sure delete this task?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteNote(text, record)"
          @cancel="cancel"
        >
          <a class="actions">删除</a>
        </a-popconfirm>
      </span>
    </a-table>
    <NoteView ref="noteShow" />
  </div>
</template>
<script>
import NoteView from "./NoteView";
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "note/initTableItems"
    });
  },
  components: {
    NoteView
  },
  watch: {
    // "$store.state.note.tableInfo" (newValue) {
    //   this.tableInfo = newValue;
    // },
    "$store.state.note.tableInfo.data"() {
      let data = this.$store.state.note.tableInfo.data;
      let labelList = this.$store.state.note.tableInfo.labelList;
      for (let index = 0; index < data.length; index++) {
        //设置对应标签
        let labelRes = [];
        let labelArr = data[index]["labelList"];
        if ((labelArr != null) & (labelArr.length > 0)) {
          for (let i = 0; i < labelArr.length; i++) {
            for (let j = 0; j < labelList.length; j++) {
              if (labelList[j]["id"] == labelArr[i]) {
                labelRes[i] = labelList[j]["labelName"];
              }
            }
          }
        }
        data[index]["labelListIds"] = labelRes;
        //设置key
        data[index]["key"] = data[index]["id"];
      }
      this.data = data;
    }
  },
  computed: {
    columns() {
      let labelColumn = this.$store.state.note.tableInfo.column;
      let options = {
        title: "操作",
        dataIndex: "",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "action" }
      };
      var flg = false;
      for (let i = 0; i < labelColumn.length; i++) {
        if (labelColumn[i]["dataIndex"] === "labelListIds") {
          labelColumn[i]["scopedSlots"] = { customRender: "labelListIds" };
        }
        if (labelColumn[i]["title"] === "操作") {
          flg = true;
        }
      }
      if (!flg) {
        labelColumn.push(options);
      }

      return labelColumn;
    }
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    randomColor() {
      const colorArr = [
        "geekblue",
        "green",
        "red",
        "volcano",
        "purple",
        "#108ee9",
        "orange"
      ];
      const ran = Math.floor(Math.random() * 7);
      return colorArr[ran];
    },
    showModel(text, record) {
      this.$refs.noteShow.visible = true;
      this.$refs.noteShow.domStr = record.domStr;
    },
    toUpdate(text, record) {
      sessionStorage.setItem("contentInfo", JSON.stringify(record));
      this.$router.push({
        name: "updateNote"
      });
    },
    deleteNote(text, record) {
      this.$store.dispatch({
        type: "note/deleteNote",
        id: record.id
      });
      this.$message.info("success!");
    },
    cancel() {}
  }
};
</script>

<style scoped>
.actions {
  margin-left: 10px;
}
</style>
