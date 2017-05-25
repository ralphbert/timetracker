import Vue from 'vueCommon';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutations from './mutations';
import actions from './actions';

console.log('actions', actions);
console.log('mutations', mutations);

let store = {
  state: {
    connectionStatus: '',
    projects: [],
    projectsLoading: false,
    currentLog: null,
    errors: {}
  },
  actions: actions,
  mutations: mutations,
};

export default new Vuex.Store(store);