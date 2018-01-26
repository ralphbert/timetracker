import { projectsRef, database } from './firebase';
import { Transformer, Task } from './models';

class ApiInterface {
  constructor() {
    this.liveProjectUpdate = false;
  }

  setEnableLiveUpdates(enable, cb) {
    if (enable && !this.liveProjectUpdate) {
      console.log('enable project listener');
      this.liveProjectUpdate = true;
      projectsRef.orderByChild('startTime').on('value', snapshot => {
        let projects = Transformer.listSnapshotToArray(snapshot);
        cb(projects);
      });
    } else if (!enable) {
      this.liveProjectUpdate = false;
      console.log('disabling project listener');
      projectsRef.off('value');
    }
  }

  getProjects() {
    return new Promise((resolve, reject) => {
      projectsRef.once('value').then(snapshot => {
        console.log('snapshot', snapshot);
        let projects = [];
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          childData.id = childKey;
          projects.push(childData);
        });

        resolve(projects);
      }, reject);
    });
  }

  addProject(project) {
    var ref = projectsRef.push();
    console.log('addProject', ref);
    return ref.set({
      ...project
    }).then(project => {
      console.log('added', arguments, ref.key);
      var taskId = database.ref('projects/' + ref.key + '/tasks').push();
      return taskId.set(new Task());
    }).catch(function(err) {
      console.error(err);
    });
  }

  removeProject(project) {
    return database.ref('projects/' + project.id).remove();
  }
}

export default new ApiInterface();