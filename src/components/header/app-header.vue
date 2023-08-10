<template>
  <header
    class="header"
    :style="{ backgroundColor: activeColor }"
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
import { computed, defineComponent } from 'vue';
import { menu } from './menu';
import TopNavBar from '../menu/top-nav-bar.vue';
import { TLink } from '../menu/types';
import { GlobalState } from '@/shared/api/state/state';

const globalState = GlobalState.getInstance();

export default defineComponent({
  setup() {
    const activeColor = computed(() => globalState.getState?.activeColor);
    return {
      activeColor,
      topMenu: menu as TLink[],
    };
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
