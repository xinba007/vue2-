import { constantRoutes, asyncRoutes } from "@/router/index";
import { getUserMenuAndPermission } from "@/api/user";
import { LoadMenus } from "@/utils/Menus";
import { AppId } from "config";

export default {
  state: {
    routes: [],
    addRoutes: [],
    routerLoadDone: false,
    roles: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
      state.routerLoadDone = true;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },
  actions: {
    reloadRouterLoadDone({ state }) {
      state.routerLoadDone = false;
    },
    async generateRoutes({ commit }) {
      const { body, status } = await getUserMenuAndPermission({
        appId: +AppId,
      });
      if (status === 200) {
        const { menus, permissions } = body;
        commit("SET_ROLES", permissions);
        const accessedRoutes = LoadMenus(menus, asyncRoutes);
        // isAdmin
        //   ? matchMenuResource(menus, asyncRoutes)
        //   : LoadMenus(menus, asyncRoutes);
        commit("SET_ROUTES", accessedRoutes);
        return accessedRoutes;
      }
      commit("SET_ROUTES", []);
      return [];
    },
  },
};
