<template lang="html">
    <div>
        <project-list></project-list>
        <project-form></project-form>
        <current-log></current-log>
    </div>
</template>

<script>
    import ProjectForm from '../components/ProjectForm.vue';
    import ProjectList from '../components/ProjectList.vue';
    import CurrentLog from '../components/CurrentLog.vue';
    import firebase from '../api/firebase';
    import * as mutations from '../store/mutations';
    import { Transformer as Transformer } from '../api/models';

  export default {
    components: {
      ProjectForm,
      ProjectList,
      CurrentLog
    },
    mounted: function() {
      console.log('MOUNTED');
    }
  }
</script>

<style lang="sass" scoped>
</style>