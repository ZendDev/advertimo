<template>
  <ul class="header-submenu">
    <li v-for="(menu, index) in submenu" :key="index">
        <router-link :to="menu.link">
            <vs-button type="line">{{ menu.name }}</vs-button>
        </router-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: mapState({
        submenu: state => state.submenu,
    })
}
</script>

<style>

</style>