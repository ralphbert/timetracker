import Vue from 'vueCommon';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Landing from './pages/Landing.vue';
import About from './pages/About.vue';

const router = new VueRouter({
  routes: [{
    name: 'landing',
    path: '/',
    component: Landing
  }, {
    name: 'about',
    path: '/about',
    component: About
  }]
});

export default router;