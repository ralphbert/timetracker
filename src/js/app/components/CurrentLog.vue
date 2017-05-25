<template lang="html">
    <div>
        <p>{{ 1000 | duration }}</p>
        <p>{{ 12000 | duration }}</p>
        <p>{{ 3721000 | duration }}</p>
        <p>{{ 3600000 | duration }}</p>
        <p>{{ 3610000 | duration }}</p>


        <hr>
        {{ $store.state.currentLog }}
        <hr>
        {{ $store.state.logs }}
        <ul>
            <li v-for="log in $store.state.logs">{{ log.description }}, {{ log.startTime }}, {{ log.endTime }}, {{ getProject(log) }}, {{ getDuration(log) | duration }}</li>
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
            console.log('find project', project);
            return project.id == log.project;
        });

        return (hit) ? hit.name : 'unknown'
      }
    },
    mounted: function() {

    }
  }
</script>

<style lang="sass" scoped>

</style>