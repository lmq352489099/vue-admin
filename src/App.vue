<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
/* ui框架 有自带rest样式*/ 
@import '~iview/dist/styles/iview.css';
@import './assets/style/theme/rest-iview.css';
@import './assets/style/navbar.css';
@import './assets/style/common.css';

</style>
