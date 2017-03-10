<template lang="html">
    <div>
        <h2>TT</h2>
        <ul>
            <li><router-link to="landing">Landing</router-link></li>
            <li><router-link to="about">About</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="sass" scoped>
</style>