import Vue from "vue";
import VueRouter from "vue-router";

/* 解决页面跳转 报 Uncaught (in promise)异常 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

import Layout from "@/layout/index.vue";
import menu from "./menu"
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/logincommon/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404/index"),
    hidden: true,
  },
  {
    /* 首页 */
    path: "",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: "home",
          noCache: true,
          affix: true,
        },
      },
    ],
  },
  ...menu
];

/**
 * 动态加载资源菜单
 * 默认配置的菜单目录需要在 ^ 上面的 constantRoutes 里面配置
 */
export const asyncRoutes = [
  /**
   * 404页面默认是要添加到最底层，
   * 不然404之后的页面会因为 通配符的原因，
   * 页面刷新直接进入404页面。
   */
  { path: "*", redirect: "/404", meta: { title: "404" }, hidden: true },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: constantRoutes,
});

export default router;
