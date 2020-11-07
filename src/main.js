import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Tabs,
  Input,
  Icon,
  Switch,
  Button,
  Layout,
  Menu,
  Table,
  Modal,
  Form,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Cascader,
  message,
  Popconfirm,
  Col,
  Row,
  Tag,
  Collapse,
  TreeSelect,
  Upload
} from "ant-design-vue";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
Vue.use(hljs);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Table);
Vue.use(Modal);
Vue.use(Form);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Cascader);
Vue.use(Popconfirm);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tag);
Vue.use(Collapse);
Vue.use(TreeSelect);
Vue.use(mavonEditor);
Vue.use(Upload);
Vue.prototype.$message = message;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
