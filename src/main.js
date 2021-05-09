import Vue from 'vue';
import App from './App.vue';
import jsonp from 'jsonp';
Vue.config.productionTip = false;
Vue.prototype.$jsonp = jsonp;
new Vue({
  render: (h) => h(App),
}).$mount('#app');
