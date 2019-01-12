import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import TreeView from "vue-json-tree-view";
Vue.use(TreeView);

import Vue from "vue";
import VueAnalytics from "vue-analytics";

Vue.use(VueAnalytics, {
  id: "UA-132350618-1",
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
