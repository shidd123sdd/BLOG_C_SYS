import router from "../../router";
import request from "../../utils/request";
const url = "http://localhost:9000";
// const url = "http://39.100.106.43:9000";
const state = {
  user: {
    username: "admin"
  }
};

const actions = {
  async submitLogin({ commit }, { userInfo }) {
    await request({
      url: url + "/api/user/login",
      method: "post",
      data: { username: userInfo.username, password: userInfo.password }
    });
    sessionStorage.setItem("token", userInfo.username);
    commit("saveUserInfo", userInfo);
    router.push("/");
  }
};
const mutations = {
  saveUserInfo(state, { userInfo }) {
    state.user = {
      ...userInfo
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
