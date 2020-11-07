import request from "../../utils/request";
const state = {
  img: {
    imgPath: ""
  },
  tableInfo: {
    data: [],
    column: [],
    labelList: [],
    artColumn: [],
    artData: []
  }
};
const url = "http://localhost:9000";
// const url = "http://39.100.106.43:9000";
const actions = {
  async submitNote(context, { noteVo }) {
    await request({
      url: url + "/api/note/addNote",
      method: "post",
      data: noteVo
    });
  },
  async updateNote({ commit }, { noteVo }) {
    await request({
      url: url + "/api/note/update",
      method: "post",
      data: noteVo
    });
    actions.initTableItems({ commit });
  },
  async searchNote({ commit }, { condition }) {
    const res = await request({
      url: url + "/api/note/search",
      method: "post",
      data: condition
    });
    commit("searchNoteList", { res });
  },
  async deleteNote({ commit }, { id }) {
    await request({
      url: url + "/api/note/delete",
      method: "get",
      params: { id: id }
    });
    actions.initTableItems({ commit });
  },
  async uploadImage({ commit }, { formdata }) {
    const res = await request({
      url: url + "/api/note/uploadImg",
      method: "post",
      data: formdata
    });
    commit("addImgPath", { res });
    return res.data;
  },
  async initTableItems({ commit }) {
    const res = await request({
      url: url + "/api/note/getColumnList"
    });
    commit("initTableInfo", { res });
  }
};
const mutations = {
  addImgPath(state, { res }) {
    if (res.state === 1) {
      state.img.imgPath = res.data;
    }
  },
  initTableInfo(state, { res }) {
    state.tableInfo = {
      data: res.data["noteList"],
      column: res.data["noteColumns"],
      artColumn: res.data["artColoumns"],
      artData: res.data["artList"],
      labelList: res.data["labelList"]
    };
  },
  searchNoteList(state, { res }) {
    const resList = res.data["noteList"];
    let noteList = [];
    let artList = [];
    for (let i = 0; i < resList.length; i++) {
      if (resList[i].type == 1) {
        noteList.push(resList[i]);
      } else {
        artList.push(resList[i]);
      }
    }
    if (noteList.length > 0) {
      state.tableInfo = {
        ...state.tableInfo,
        data: noteList
      };
    }
    if (artList.length > 0) {
      state.tableInfo = {
        ...state.tableInfo,
        artData: artList
      };
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
