<template>
  <app-header></app-header>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/header/app-header.vue';
import { GlobalState } from './shared/api/state/state';

const globalState = GlobalState.getInstance();
globalState.setState = {
  activeColor: '#d34b4b',
};

export default defineComponent({
  components: {
    AppHeader,
  },
});
</script>

<style lang="scss" src="./shared/assets/style/style.scss"></style>
