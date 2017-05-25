import Firebase from '../../../../node_modules/firebase/app';
import Auth from '../../../../node_modules/firebase/auth';
import Database from '../../../../node_modules/firebase/database';
import Config from '../../app/firebase.settings';
const firebase = Firebase.initializeApp(Config);

export default firebase;
export const database = firebase.database();
export const projectsRef = database.ref('projects');
export const logsRef = database.ref('logs');