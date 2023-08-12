<template>
  <header
    class="header"
    :style="{ backgroundColor: store.activeColor }"
  >
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
import { globalStore } from '@/shared/api/store/store';

export default defineComponent({
  setup() {
    const store = globalStore;
    const topMenu = menu as TLink[];

    return {
      store,
      topMenu,
    };
  },
  components: {
    'top-nav-bar': TopNavBar,
  },
});
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  transition: background-color 0.2s ease-in;
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
