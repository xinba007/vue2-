const getters = {
  sidebar: (state) => state.app.sidebar,
  language: (state) => state.app.language,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  admin: (state) => state.user.admin,
  user: (state) => state.user.user,
  roles: (state) => state.permission.roles,
  permission_routes: (state) => state.permission.routes,
  routerLoadDone: (state) => state.permission.routerLoadDone, //router是否已经加载完成
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  resTypeList: (state) => state.afterSaleNum.resTypeList,
};
export default getters;
