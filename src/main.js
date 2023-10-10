import Vue from "vue";

import "babel-polyfill"; //解决vue在ie的兼容性问题
import "normalize.css/normalize.css"; //优化 css 跨浏览器的一致性

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss"; //global css
import Cookies from "js-cookie";

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import permission from "./directives/index";

import "./icons"; //icon
import "@/utils/Interceptor"; //拦截器
import i18n from "./lang/index"; //internationalization
import filters from "@/filters/index";

import * as ComponentMap from "./components"

Object.keys(ComponentMap).forEach(componentName => {
  Vue.component( componentName, ComponentMap[ componentName ] );
})
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

Vue.use(Element, {
  size: Cookies.get("size") || "small",
  i18n: (key, value) => i18n.t(key, value),
});
Vue.use(permission);

import elCascaderMulti from "el-cascader-multi";
Vue.use(elCascaderMulti);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
