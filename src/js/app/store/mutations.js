export const ADD_PROJECT = 'addProject';
export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_PROJECT_LOADING = 'SET_PROJECT_LOADING';
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';
export const START_TRACKING = 'START_TRACKING';
export const SET_LOGS = 'SET_LOGS';
export const CLEAR_CURRENT_LOG = 'CLEAR_CURRENT_LOG';

export default {
  [ADD_PROJECT](store, payload) {
    store.projects.push(payload);
  },
  [SET_PROJECTS](store, payload) {
    store.projects = payload;
  },
  [ADD_ERROR](store, error) {
    var key = 'global';

    if (typeof error != 'string') {
      key = error.type;
    }

    var errors = store.errors[key];

    if (!errors) {
      errors = [];
    }

    errors.push(error.message);
    store.errors = { ...store.errors, [key]: errors }
  },
  [CLEAR_ERROR](store, type) {
    store.errors = { ...store.errors, [type]: [] }
  },
  [SET_PROJECT_LOADING](store, payload) {
    store.projectsLoading = !!payload;
  },
  [SET_CONNECTION_STATUS](store, payload) {
    store.connectionStatus = payload;
  },
  [START_TRACKING](store, payload) {
    console.log('start tracking');
    if (store.currentLog && store.currentLog != payload.log) {
      store.currentLog.endTime = (new Date()).getTime();
    }

    store.currentLog = payload.log;
  },
  [SET_LOGS](store, payload) {
    store.logs = payload.logs;
  },
  [CLEAR_CURRENT_LOG](store, payload) {
    store.currentLog = null;
  }
}