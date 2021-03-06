import firebase from '../api/firebase';
import apiInterface from '../api/apiInterface';
import * as mutations from './mutations';
import { Project, Log } from '../api/models';

export const ADD_PROJECT = 'addProject';
export const REMOVE_PROJECT = 'removeProject';
export const SIGN_IN = 'signIn';
export const START_TRACKING = 'startTracking';
export const END_TRACKING = 'endTracking';
export const END_ALL_TRACKINGS = 'endAllTrackings';

export default {
  [SIGN_IN](context, payload) {
    firebase.auth().signInAnonymously().catch(function(error) {
      context.commit(mutations.CLEAR_ERROR, { type: 'auth' });
      context.commit(mutations.ADD_ERROR, { type: 'auth', message: error.message });
    });
  },
  [ADD_PROJECT](context, payload) {
    context.commit(mutations.SET_PROJECT_LOADING, true);
    apiInterface.addProject(new Project(payload.name)).then(function() {
      context.commit(mutations.SET_PROJECT_LOADING, false);
    }, function(error) {
      context.commit(mutations.ADD_ERROR, { type: 'projects', message: error.message });
      context.commit(mutations.SET_PROJECT_LOADING, false);
    });
  },
  [REMOVE_PROJECT](context, payload) {
    apiInterface.removeProject(payload).then(function() {
    }, function(error) {
      context.commit(mutations.ADD_ERROR, { type: 'projects', message: error.message });
    });
  },
  [START_TRACKING](context, payload) {
    console.log(START_TRACKING);
    context.dispatch(END_ALL_TRACKINGS, {}).then(() => {
      var logRef = firebase.database().ref('logs').push();
      var log = new Log(payload.projectId);
      logRef.set(log).then(() => {
        context.commit(mutations.START_TRACKING, { log: log });
      });
    });
  },
  [END_TRACKING](context, payload) {
    console.log(END_TRACKING);
    context.dispatch(END_ALL_TRACKINGS, {}).then(() => {
      context.commit(mutations.CLEAR_CURRENT_LOG);
      return Promise.resolve();
    });
  },
  [END_ALL_TRACKINGS](context) {
    console.log(END_ALL_TRACKINGS);
    let updateRoutines = [];
    let updates = {};
    let logsRef = firebase.database().ref('logs');

    logsRef.orderByChild('endTime').equalTo(0).once('value', (snapshot) => {
      let totalWorkingTime = {};

      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        if (childData && childKey) {
          childData.endTime = (new Date()).getTime();
          childData.duration = childData.endTime - childData.startTime;
          updates['logs/' + childKey] = childData;

          if (!totalWorkingTime[childData.project]) {
            totalWorkingTime[childData.project] = 0;
          }

          totalWorkingTime[childData.project] += childData.endTime - childData.startTime;
        }

      });


      Object.keys(totalWorkingTime).forEach(key => {
        firebase.database().ref('totals/' + key).once('value', (snapshot) => {
          let data = snapshot.val();

          if (!data) {
            data = {
              duration: 0
            };
          }

          data.duration += totalWorkingTime[key];
          firebase.database().ref('totals/' + key).update(data);
        });
      });
        console.log('totalWorkingTime', totalWorkingTime);
    });

    updateRoutines.push(firebase.database().ref().update(updates));

    return Promise.all(updateRoutines).then(() => {
      context.commit(mutations.CLEAR_CURRENT_LOG);
      return Promise.resolve();
    });
  }
}