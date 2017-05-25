<template lang="html">
    <div>
        <form v-on:submit.prevent="add">
            <div class="form-group">
                <label id="project-title">Project</label>
                <input class="form-control" v-model="name">
            </div>
        </form>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';
    import * as actions from '../store/actions';

  export default {
    data: function () {
      return {
        name: ''
      }
    },
    methods: {
      ...mapActions({
        addProject: actions.ADD_PROJECT
      }),
      add: function() {
        console.log('add', this.name);
        this.addProject({ name: this.name });
        this.name = '';
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>