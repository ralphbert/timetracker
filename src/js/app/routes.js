import Landing from './pages/landing.vue';
import About from './pages/about.vue';

export default [{
  path: '/',
  component: Landing,
  name: 'landing'
}, {
  path: '/about',
  component: About,
  name: 'about'
}];