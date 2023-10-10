import { getToken, setToken, removeToken } from "@/utils/Auth";
import { getUserDetailsInfo } from "@/api/user";
import { login, logOut } from "@/api/login";
import { Notification } from "element-ui";
import { Role } from "@/utils/Enum/User";
import i18n from "@/lang";
import { setStorage } from "@/utils/index";

export default {
  state: {
    token: getToken(),
    user: {},
    name: null,
    avatar: null,
    admin: null,
  },
  mutations: {
    SET_TOKEN: (_, token) => {
      setToken(token);
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_WS: (state, ws) => {
      state.ws = ws;
    },
    SET_ADMIN: (state, bool) => {
      state.admin = bool;
    },
  },
  actions: {
    // 用户名登录
    async userLogin({ commit }, form) {
      const { status, body } = await login(form);
      if (status === 200) {
        const { token } = body;
        // const { ucUsers, roleInfo, ynAdmin } = loginInfo;
        // if (!_.isNil(ynAdmin) && !ynAdmin) {
        //   /* 没有登录权限 */
        //   Notification.error({
        //     title: i18n.t("login.noPermission"),
        //     duration: 3000,
        //   });
        //   return;
        // }
        // const { userName } = ucUsers;
        // commit("SET_ADMIN", ynAdmin);
        commit("SET_TOKEN", token);
        // commit("SET_NAME", userName);
        // commit("SET_USER", ucUsers);
        // commit("SET_AVATAR", null);
        // commit("SET_ROLES", roleInfo);
        return status;
      } else {
        Notification.error(i18n.t("login.errMsg"));
        return;
      }
    },
    /* 获取用户详情 */
    async getUserInfo({ commit }) {
      const { body, status } = await getUserDetailsInfo();
      if (status === 200) {
        const { user, account, companyName } = body;
        const { ynAdmin } = account;
        const superAdmin = ynAdmin === Role.ADMIN;
        commit("SET_ADMIN", superAdmin);
        commit("SET_NAME", user.userName);
        commit("SET_USER", { avatar: null, ...user });
        commit("SET_AVATAR", null);
        setStorage('companyName', companyName)
        return { isAdmin: superAdmin };
      }
      return { isAdmin: false };
    },
    // 前端 登出
    fedLogOut() {
      logOut();
      removeToken();
    },
    // remove token
    async resetToken() {
      removeToken();
    },
  },
};
