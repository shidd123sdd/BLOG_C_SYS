<template>
  <div>
    <a-table :columns="columns" :data-source="data">
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
    "$store.state.note.tableInfo.artData": function(newValue) {
      let data = newValue;
      for (let index = 0; index < data.length; index++) {
        data[index]["key"] = data[index]["id"];
      }
      this.data = data;
    }
  },
  computed: {
    columns() {
      let labelColumn = this.$store.state.note.tableInfo.artColumn;
      let options = {
        title: "操作",
        dataIndex: "",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "action" }
      };
      var flg = false;
      for (let i = 0; i < labelColumn.length; i++) {
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
    showModel(text, record) {
      this.$refs.noteShow.visible = true;
      this.$refs.noteShow.domStr = record.domStr;
    },
    toUpdate(text, record) {
      sessionStorage.setItem("contentInfo", JSON.stringify(record));
      this.$router.push({
        name: "updateArt"
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
