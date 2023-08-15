<template>
  <nav class="nav">
    <router-link
      :to="item.url"
      class="nav__link"
      v-for="(item, key) in navBar"
      :key="key"
    >
      {{ item.title }}
    </router-link>
  </nav>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import { TLink } from './types';
import { globalStore } from '@/shared/api/store/store';

export default defineComponent({
  props: {
    menu: Array as PropType<TLink[]>,
  },
  setup(props) {
    const navBar = computed(() => {
      if (!globalStore.userId) {
        return props.menu?.filter((item) => item.url !== '/statistics');
      }
      return props.menu;
    });
    return {
      navBar,
    };
  },
});
</script>

<style scoped>
.nav {
  height: inherit;
  display: flex;
  align-items: center;
}

.nav__link {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 30px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  font-weight: 600;
  font-size: 24px;
  color: #fff;

  &:hover {
    background-color: #fff;
    color: #ff5a5a;
  }
}

.nav__item {
  height: inherit;
}
</style>
