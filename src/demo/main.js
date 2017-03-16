import Vue from 'vue'
import VueMeta from 'vue-meta'

import App from './App.vue'

Vue.use(VueMeta)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
