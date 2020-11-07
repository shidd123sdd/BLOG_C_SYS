<template>
  <div>
    <!-- @submit="submitHandle" -->
    <a-form
      :form="form"
      class="editNodeForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 8 }"
    >
      <a-collapse default-active-key="1" :bordered="false">
        <template #expandIcon="props">
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel key="1" header="基础信息" :style="customStyle">
          <div class="baseInfo">
            <a-form-item label="正标题">
              <a-input
                v-decorator="[
                  'offTitle',
                  {
                    initialValue: contentInfo ? contentInfo.offTitle : null,
                    rules: [{ required: true, message: '请输入正标题' }]
                  }
                ]"
                placeholder="请输入正标题"
              />
            </a-form-item>

            <a-form-item label="副标题" v-show="!isArt">
              <a-input
                v-decorator="[
                  'subTitle',
                  {
                    initialValue: contentInfo ? contentInfo.subTitle : null,
                    rules: [{ required: true, message: '请输入副标题' }]
                  }
                ]"
                placeholder="请输入副标题"
              />
            </a-form-item>
            <a-form-item label="标签" v-show="!isArt">
              <a-tree-select
                :tree-data="treeData"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="Please select"
                allow-clear
                multiple
                v-decorator="[
                  'labelList',
                  {
                    initialValue: contentInfo ? contentInfo.labelList : [],
                    rules: [
                      { type: 'array', required: true, message: '请选择标签' }
                    ]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="上传图片">
              <a-upload
                name="image"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="http://39.100.106.43:9000/api/note/uploadImg"
                @change="handleChange"
              >
                <img
                  v-if="
                    isUpdate
                      ? contentInfo.imgPath
                        ? true
                        : false
                      : imageUrl.url == ''
                      ? false
                      : true
                  "
                  :src="imageUrl.url"
                />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </a-form-item>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="文章内容" :style="customStyle2">
          <Editor
            ref="editorContext"
            :contentValue="contentInfo ? String(contentInfo.content) : ''"
          />
        </a-collapse-panel>
      </a-collapse>

      <a-form-item :wrapper-col="{ span: 24, offset: 12 }">
        <a-button type="primary" @click="submitHandle">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Editor from "../../components/mainContainer/Editor";

export default {
  beforeCreate() {
    const { $store } = this;
    $store.dispatch({
      type: "label/getLabelList"
    });
  },
  watch: {
    "$store.state.label.labelList": function(val) {
      this.treeData = val;
    }
  },
  components: {
    Editor
  },
  data() {
    this.form = this.$form.createForm(this);
    const tree = this.$store.state.label.labelList;
    return {
      text: ``,
      customStyle:
        "background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden;",
      customStyle2:
        "background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;",
      treeData: tree,
      value: [],
      loading: false,
      imageUrl: {
        url: ""
      }
    };
  },
  computed: {
    contentInfo() {
      if (
        this.$route.path === "/article/updateNote" ||
        this.$route.path === "/article/updateArt"
      ) {
        const contentVo = JSON.parse(sessionStorage.getItem("contentInfo"));
        this.$set(this.imageUrl, "url", contentVo.imgPath + "");
        return contentVo;
      } else {
        return null;
      }
    },
    isArt() {
      if (
        this.$route.path === "/article/updateArt" ||
        this.$route.path === "/article/addArt"
      ) {
        return true;
      } else {
        return false;
      }
    },
    isUpdate() {
      if (
        this.$route.path === "/article/updateArt" ||
        this.$route.path === "/article/updateNote"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    submitHandle() {
      const domStr = this.$refs.editorContext.html;
      const content = this.$refs.editorContext.content;
      this.form.validateFields((error, values) => {
        values = {
          ...values,
          domStr: domStr,
          content: content,
          imgPath: this.imageUrl.url
        };
        if (this.isArt) {
          values = {
            ...values,
            type: 2
          };
        } else {
          values = {
            ...values,
            type: 1
          };
        }
        if (
          this.$route.path === "/article/addNode" ||
          this.$route.path === "/article/addArt"
        ) {
          this.$store.dispatch({
            type: "note/submitNote",
            noteVo: values
          });
        } else if (
          this.$route.path === "/article/updateNote" ||
          this.$route.path === "/article/updateArt"
        ) {
          values = {
            ...values,
            domStr: domStr,
            content: content,
            id: this.contentInfo.id
          };
          this.$store.dispatch({
            type: "note/updateNote",
            noteVo: values
          });
        }
        this.$message.info("success!");
        if (this.isArt) {
          this.$router.push("/article/artList");
        } else {
          this.$router.push("/article/noteList");
        }
      });
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.imageUrl.url = info.file.response.data.filePath + "";
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.editNodeForm {
  .baseInfo {
    width: 30%;
  }
  /deep/.ant-form {
    max-width: none;
  }
  /deep/.ant-form-item {
    display: flex;
  }
  /deep/.ant-form-item-control-wrapper {
    flex: 1;
  }
  /deep/.avatar-uploader {
    /deep/.ant-upload {
      width: 128px;
      height: 128px;
    }
  }
  /deep/.ant-upload-select-picture-card {
    /deep/i {
      font-size: 32px;
      color: #999;
    }
    /deep/.ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
    /deep/img {
      max-width: 400px;
    }
  }
}
</style>
