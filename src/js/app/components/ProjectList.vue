<template lang="html">
    <div>
        <ul >
            <li v-for="project in projects">
                {{ project.name }}

                <ul>
                    <li v-for="(value, key) in project.tasks">
                        <span v-if="isTrackedProject(project)"> --&gt; </span>
                        {{ value.name }}
                        <button v-if="!isTrackedProject(project)" v-on:click="start(project.id, key)">Play</button>
                        <button v-else v-on:click="end(project.id, key)">End</button>
                    </li>
                </ul>
            </li>
        </ul>
        <div v-if="loading">Loading...</div>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import * as actions from '../store/actions';

  export default {
    computed: {
      ...mapState({
        projects: 'projects',
        loading: 'projectsLoading',
        currentLog: 'currentLog'
      })
    },
    methods: {
      deleteProject: function(project) {
        this.$store.dispatch(actions.REMOVE_PROJECT, project);
      },
      start: function(projectId, taskId) {
        console.log('start');
        if (this.currentLog) {
          this.end().then(() => {
            this.$store.dispatch(actions.START_TRACKING, { projectId: projectId, taskId: taskId });
          });
        } else {
          this.$store.dispatch(actions.START_TRACKING, { projectId: projectId, taskId: taskId });
        }
      },
      end: function(projectId, taskId) {
        if (this.currentLog) {
          return this.$store.dispatch(actions.END_TRACKING, { log: this.currentLog });
        }

        return Promise.resolve();
      },
      isTrackedProject: function(project) {
        var log = this.$store.state.currentLog;
        if (log) {
          return log.project == project.id;
        }

        return false;
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>