import Vue from 'vue'
import App from './App.vue'

import router from './router';

import 'jquery';
import 'popper.js';
import 'bootstrap';
import './assets/app.css';

import VMask from 'v-mask';

Vue.use(VMask);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
