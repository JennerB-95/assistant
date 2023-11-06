import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import WebRTC from 'vue-webrtc'
import { store } from "./store/index";
import OneSignalVue from 'onesignal-vue'
import CircularCountDownTimer from "vue-circular-count-down-timer";
import VueExcelXlsx from "vue-excel-xlsx";
import Notifications from 'vue-notification'
import VueAWN from "vue-awesome-notifications"
require("vue-awesome-notifications/dist/styles/style.css") 
import AWN from "awesome-notifications";

/*
or for SSR:
import Notifications from 'vue-notification/dist/ssr.js';
*/

const options1 = {
  confirmButtonColor: '#ADE2F8',
  cancelButtonColor: '#ff7674',
};

Vue.prototype.$ale = new AWN({
  position: 'top-right',
  info: "You have 3 unread messages",
});

Vue.use(VueSweetalert2, options1);
Vue.use(OneSignalVue);
Vue.use(WebRTC);
Vue.use(Notifications);
Vue.use(VueAWN);
Vue.use(VueExcelXlsx);
Vue.use(CircularCountDownTimer);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  template: "<App/>",
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
