import Vue from 'vueCommon';
import VueRouter from 'vue-router';
import Routes from './routes';
import App from './app.vue';

Vue.use(VueRouter);

console.log(Routes);

const router = new VueRouter({
  Routes
});

new Vue({
  router,
  components: { App },
  template: `<app></app>`
}).$mount('#app');