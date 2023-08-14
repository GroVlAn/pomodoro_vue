<template>
  <app-header></app-header>
  <app-loader></app-loader>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/header/app-header.vue';
import AppLoader from './components/loader/app-loader.vue';

export default defineComponent({
  components: {
    'app-header': AppHeader,
    'app-loader': AppLoader,
  },
});
</script>

<style lang="scss" src="./shared/assets/style/style.scss"></style>
