<template lang="html">
    <div>
        <h2>Timetracker: {{ $store.state.connectionStatus }}</h2>
        <ul>
            <li><router-link :to="{ name: 'landing' }">Landing</router-link></li>
            <li><router-link :to="{ name: 'about' }">About</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import * as actions from '../store/actions';
    import * as mutations from '../store/mutations';
    import { projectsRef, database } from '../api/firebase';
    import api from '../api/apiInterface';
    import { Transformer, Task } from '../api/models';

    export default {
        mounted: function() {
          this.$store.dispatch(actions.SIGN_IN);

          api.setEnableLiveUpdates(true, (projects) => {
            this.$store.commit(mutations.SET_PROJECTS, projects);
          });

          var connectedRef = database.ref(".info/connected");
          connectedRef.on("value", (snap) => {
            console.log(snap.val());
            if (snap.val() === true) {
              this.$store.commit(mutations.SET_CONNECTION_STATUS, 'connected');
            } else {
              this.$store.commit(mutations.SET_CONNECTION_STATUS, 'disconnected');
            }
          });

          database.ref('totals').on('value', (snapshot) => {
            let totals = Transformer.listSnapshotToArray(snapshot);
            this.$store.commit(mutations.SET_TOTALS, totals);
          });

          database.ref('logs').orderByChild('startTime').on('value', snapshot => {
            let logs = Transformer.listSnapshotToArray(snapshot);
            this.$store.commit(mutations.SET_LOGS, { logs });
          });
        }
    }
</script>

<style lang="sass" scoped>
</style>