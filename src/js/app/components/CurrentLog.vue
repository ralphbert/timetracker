<template lang="html">
    <div>
        <hr>
        {{ $store.state.currentLog }}
        <ul>
            <li v-for="log in logs">{{ log.description }}, {{ log.startTime }}, {{ log.endTime }}, {{ getProject(log) }}, {{ getDuration(log) | duration }}</li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';

  export default {
    data: function() {
      return {
        passedTime: 0
      }
    },
    methods: {
      getDuration(log) {
        if (log.endTime == 0) {
          return (new Date()).getTime() - log.startTime;
        } else {
          return log.endTime - log.startTime;
        }
      },
      getProject(log) {
        let hit = this.$store.state.projects.find((project) => {
            return project.id == log.project;
        });

        return (hit) ? hit.name : 'unknown'
      }
    },
    computed: {
      logs: function() {
        return this.$store.state.logs;
      }
    },
    mounted: function() {

    }
  }
</script>

<style lang="sass" scoped>

</style>