import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import label from "./modules/label";
import note from "./modules/note";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    label,
    note
  }
});
