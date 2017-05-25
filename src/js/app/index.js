import Vue from 'vueCommon';
import router from './routes';
import store from './store';
import App from './components/App.vue';
import * as DateFilters from './filters/date';


Vue.filter('duration', DateFilters.duration);

new Vue({
  router,
  store,
  components: { App },
  template: `<app></app>`,
  el: '#app'
});