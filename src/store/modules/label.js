import request from "../../utils/request";

const state = {
  labelList: [],
  labelColumnList: []
};
const url = "http://localhost:9000";

// const url = "http://39.100.106.43:9000";
const actions = {
  async getLabelList({ commit }) {
    const res = await request({
      url: url + "/api/label/getList",
      method: "get"
    });
    commit("setLableList", res.data);
  },
  async addNewLabel({ commit }, { labelEntity }) {
    const res = await request({
      url: url + "/api/label/addLabel",
      method: "post",
      data: labelEntity
    });
    if (res.state === 1) {
      actions.getLabelList({ commit });
    }
  },
  async searchLabel({ commit }, { data }) {
    const topath = url + "/api/label/search?labelName=" + data;
    const res = await request({
      url: topath,
      method: "get"
    });
    if (res.state === 1) {
      commit("setLableList", res.data);
    }
  },
  async deleteLabel({ commit }, { id }) {
    const topath = url + "/api/label/delete?id=" + id;
    const res = await request({
      url: topath,
      method: "get"
    });
    if (res.state === 1) {
      actions.getLabelList({ commit });
    }
  },
  async updateLabel({ commit }, { labelEntity }) {
    const res = await request({
      url: url + "/api/label/updateLabel",
      method: "post",
      data: labelEntity
    });
    if (res.state === 1) {
      actions.getLabelList({ commit });
    }
  }
};
const getters = {
  getlabelList: state => state.labelList
};
const mutations = {
  setLableList(state, res) {
    const labelList = res["labelList"];
    let result = [];
    if (labelList) {
      for (let i = 0; i < labelList.length; i++) {
        result[i] = transform(labelList[i]);
      }
    }
    if (res["labelColumnList"]) {
      state.labelList = labelList ? result : [];
    } else {
      state.labelList = labelList ? labelList : [];
    }
    sessionStorage.setItem("labelList", JSON.stringify(state.labelList));
    state.labelColumnList = res["labelColumnList"]
      ? res["labelColumnList"]
      : state.labelColumnList;
  }
};

const transform = function(obj) {
  for (let key in obj) {
    let temp = obj[key];
    if ("id" === key.toString()) {
      obj["value"] = obj[key];
      obj["key"] = obj[key];
    }
    if ("labelName" === key.toString()) {
      obj["label"] = obj[key];
    }
    if ("show" === key.toString()) {
      obj["isShow"] = obj[key];
      if (obj[key] == true) {
        obj["visiable"] = "是";
      } else {
        obj["visiable"] = "否";
      }
      delete obj[key];
    }

    if ("children" === key.toString() && obj[key] == null) {
      delete obj[key];
    }

    if (
      typeof temp === "object" ||
      Object.prototype.toString.call(temp) === "[object Array]"
    ) {
      transform(temp);
    }
  }
  return obj;
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
