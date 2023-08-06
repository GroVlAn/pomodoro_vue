<template>
  <app-header></app-header>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/header/app-header.vue';

export default defineComponent({
  components: {
    AppHeader,
  },
});
</script>

<style lang="scss" src="./shared/assets/style/style.scss"></style>
