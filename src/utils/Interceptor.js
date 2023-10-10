import router from "@/router";
import store from "@/store";
import { Notification } from "element-ui";
import NProgress from "nprogress";
import { getToken, setToken } from "@/utils/Auth";
import { RouterPath } from "@/utils/Enum/index";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const whiteList = [RouterPath.LOGIN];

/* 捕获url Token */
function catchUrlToken(url) {
  return new Promise((resolve) => {
    let params = {},
      h;
    let hash = url.slice(url.indexOf("?") + 1).split("&");
    for (let i = 0; i < hash.length; i++) {
      h = hash[i].split("="); //
      params[h[0]] = h[1];
    }
    const { token } = params;
    if (token && getToken() !== token) setToken(token);
    resolve();
  });
}

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  /* 捕获url Token数据 */
  await catchUrlToken(location.href);
  if (getToken()) {
    if (to.path === RouterPath.LOGIN) {
      next({ path: RouterPath.HOME });
      NProgress.done();
    } else {
      try {
        if (!store.getters.routerLoadDone) {
          const { isAdmin } = await store.dispatch("getUserInfo");
          const accessRoutes = await store.dispatch("generateRoutes", isAdmin);
          router.addRoutes(accessRoutes);
          let query = to.query;
          // query.token = getToken();
          next({ ...to, replace: true, query });
        } else {
          NProgress.done();
          next();
        }
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch("resetToken");
        Notification.error(error || "Has Error");
        // location.href = "/";
        next({ path: RouterPath.HOME });
        NProgress.done();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(RouterPath.LOGIN);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
