import variables from "@/styles/element-variables.scss";
import { getJsonStorage, setJsonStorage } from "@/utils/index";

export default {
  state: {
    showRightPanel: getJsonStorage("showRightPanel"),
    tagsView: getJsonStorage("tagsView") || true /* 是否显示 tagsView */,
    fixedHeader: getJsonStorage("fixedHeader") || true /* 固定头部 */,
    sidebarLogo: getJsonStorage("sidebarLogo") /* 是否显示logo */,
    theme: variables.theme,
    settingBtn: getJsonStorage("settingBtn") /* 是否显示设置的悬浮按钮 */,
    uniqueOpened: getJsonStorage(
      "uniqueOpened"
    ) /* 是否只保持一个子菜单的展开 */,
    showFooter: false /* 是否显示设置的底部信息 */,
    footerTxt: "" /* 底部文字，支持html语法 */,
    caseNumber: "" /* 备案号 */,
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (Object.keys(state).includes(key)) {
        state[key] = value;
        setJsonStorage(key, value);
      }
    },
  },
  actions: {
    changeSetting({ commit }, data) {
      commit("CHANGE_SETTING", data);
    },
  },
};
