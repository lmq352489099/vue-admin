<template>
    <div class="layout">
        <div class="layout-nav">
            <cmptNavbar></cmptNavbar>
        </div>
        <div class="layout-main">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>

<script>
import cmptNavbar from 'components/navBar.vue'
export default {
    components: {cmptNavbar},
    data () {
        return {
            name: '',
            password: ''
        }
    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .layout {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .layout-nav {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 200px;
        background-color: #212943;
    }
    .layout-main {
        position: relative;
        margin-left: 200px;
        min-height: 100%;
    }
</style>
