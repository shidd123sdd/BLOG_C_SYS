<template>
  <div class="edit_container">
    <div>
      <mavon-editor
        ref="md"
        :ishljs="true"
        v-model="content"
        @change="change"
        @imgAdd="$imgAdd"
        codeStyle="atom-one-dark"
        style="min-height: 600px"
        :tabSize="2"
      />
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// import "highlight.js/styles/atom-one-dark.css";
export default {
  props: {
    contentValue: {
      type: String,
      default: ""
    }
  },
  components: {
    mavonEditor //mavon-editor组件
  },
  data() {
    return {
      //contentInfo ? contentInfo.content :
      html: "",
      content: this.contentValue
      // externalLink: {
      //   markdown_css: function() {
      //     // 这是你的markdown css文件路径
      //     return "/static/markdown/github-markdown.min.css";
      //   },
      //   hljs_js: function() {
      //     // 这是你的hljs文件路径
      //     return "/static/highlightjs/highlight.min.js";
      //   },
      //   hljs_css: function(css) {
      //     // 这是你的代码高亮配色文件路径
      //     return "/static/highlightjs/styles/" + css + ".min.css";
      //   },
      //   hljs_lang: function(lang) {
      //     // 这是你的代码高亮语言解析路径
      //     return "/static/highlightjs/languages/" + lang + ".min.js";
      //   },
      //   katex_css: function() {
      //     // 这是你的katex配色方案路径路径
      //     return "/static/katex/katex.min.css";
      //   },
      //   katex_js: function() {
      //     // 这是你的katex.js路径
      //     return "/static/katex/katex.min.js";
      //   }
      // }
    };
  },
  computed: {
    contentInfo() {
      if (this.$route.path === "/article/updateNote") {
        const contentVo = JSON.parse(sessionStorage.getItem("contentInfo"));
        return contentVo;
      } else {
        return null;
      }
    }
  },
  methods: {
    change(value, render) {
      //实时获取转成html的数据
      this.content = value;
      this.html = render;
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("image", $file);
      const { $store } = this;
      $store
        .dispatch({
          type: "note/uploadImage",
          formdata: formdata
        })
        .then(res => {
          this.$refs.md.$img2Url(pos, res.filePath);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.edit_container {
  /deep/.hljs code {
    white-space: pre;
  }
  /deep/ .v-note-panel {
    height: 800px;
  }
}
</style>
