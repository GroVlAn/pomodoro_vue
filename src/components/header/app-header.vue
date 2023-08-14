<template>
  <header
    class="header"
    :style="{ backgroundColor: store.activeColor }"
  >
    <div class="header__wrapper">
      <div class="header__left">
        <router-link
          to="/"
          class="header__logo"
        >
          POMODORO
        </router-link>
      </div>
      <div class="header__right">
        <top-nav-bar :menu="topMenu"></top-nav-bar>
        <div
          class="header__login"
          v-if="!isLoggin"
        >
          <router-link
            to="/auth/sign-in"
            class="header__auth_link"
          >
            Войти
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 16 16"
            >
              <use xlink:href="../../shared/assets/images/icons/login.svg#login"></use>
            </svg>
          </router-link>
        </div>
        <div
          v-else
          class="header__logout"
        >
          <button
            @click.prevent="logout"
            type="button"
            class="header__auth_link"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { menu } from './menu';
import TopNavBar from '../menu/top-nav-bar.vue';
import { TLink } from '../menu/types';
import { globalStore } from '@/shared/api/store/store';
import { userLogout } from './service';

export default defineComponent({
  setup() {
    const store = globalStore;
    const topMenu = menu as TLink[];
    const isLoggin = computed(() => !!globalStore.userId);

    const logout = async () => {
      globalStore.isLoading = true;
      try {
        const response = await userLogout();

        if (response.status === 204) {
          localStorage.removeItem('user');
          globalStore.userId = null;
        }
      } catch {
        localStorage.removeItem('user');
        globalStore.userId = null;
      } finally {
        globalStore.isLoading = false;
      }
    };

    return {
      logout,
      store,
      topMenu,
      isLoggin,
    };
  },
  components: {
    'top-nav-bar': TopNavBar,
  },
});
</script>

<style lang="scss" scoped>
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

.header__right {
  display: flex;
  align-items: center;
  height: inherit;
}

.header__logo {
  font-weight: 900;
  font-size: 38px;
  color: #ffffff;
}

.header__auth_link {
  display: flex;
  align-items: center;
  background-color: var(--c_header_btn);
  color: #ffffff;
  border-radius: 5px;
  padding: 10px 15px;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: #ffffff;
    color: var(--c_main);

    svg {
      fill: var(--c_main);
    }
  }

  svg {
    margin-left: 10px;
    fill: #fff;
    transition: fill 0.2s ease-in;
  }
}
</style>
