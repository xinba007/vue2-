import axios from "axios";
import { Notification, MessageBox } from "element-ui";
import { getToken } from "@/utils/Auth";
import { RequestTimeout, ProxyUri as baseURL } from "config";
import store from "@/store";
import i18n from "@/lang";
import Router from "@/router/index";

// create an axios instance
const service = axios.create({
  baseURL,
  timeout: +RequestTimeout, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    config.headers["token"] = getToken();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const { status, data, message } = response;
    const { code, msg } = data;
    if (status !== 200) {
      Notification.error({
        title: message,
      });
      return Promise.reject(data);
    }
    if (code === 9999) {
      Notification.error(msg || "handle Error");
      return Promise.reject(data);
    }
    if (code === -1) {
      Notification.error(msg || "handle Error");
      // return Promise.reject(data);
    }
    if(code === 503){
      store.dispatch("resetToken");
      Notification.error('token过期')
      this.$store.dispatch("reloadRouterLoadDone");
      this.$store.dispatch("fedLogOut");
      Router.replace({ path: "/login" });
    }
    return data;
  },
  (error) => {
    try{
      const { status, data } = error.response;
      const { status: code, msg: errorMsg } = data;
      // let { errorCode, errorMsg } = error.response.data;
      if (status == 500) {
        Notification.error(i18n.t("app.request.500"));
        return;
      }
      if (status == 504) {
        Notification.error(i18n.t("app.request.504"));
        return;
      }
      if (code === 401) {
        const { label, tips, ok, cancel } = i18n.t("app.request.401");
        MessageBox.confirm(label, tips, {
          confirmButtonText: ok,
          cancelButtonText: cancel,
          type: "warning",
        }).then(() => {
          store.dispatch("fedLogOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
        return;
      }
      if (code === 403) {
        Router.push({ path: "/401" });
        return;
      }
      Notification.error({
        title: errorMsg,
        duration: 3000,
      });
      return Promise.reject(error.response.data);
    }catch{
      // store.dispatch("resetToken");
      // Router.replace({ path: "/login" });
      Notification.error({
        title: '正在重启服务，请稍等',
        duration: 3000,
      });
    }
  }
);

export default service;
