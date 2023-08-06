<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link
        to="/"
        class="header__logo"
        >POMODORO</router-link
      >
      <top-nav-bar :menu="topMenu"></top-nav-bar>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { menu } from './menu';
import TopNavBar from '../menu/top-nav-bar.vue';
import { TLink } from '../menu/types';

export default defineComponent({
  data() {
    return {
      topMenu: menu as TLink[],
    };
  },
  setup() {
    return {};
  },
  components: {
    TopNavBar,
  },
});
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  background-color: #ff5a5a;
}

.header__wrapper {
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.header__logo {
  font-weight: 900;
  font-size: 38px;
  color: #ffffff;
}
</style>
