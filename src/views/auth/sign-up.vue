<template>
  <section class="section">
    <app-sign-up>
      <template #login>
        <div class="go_to">
          <router-link to="/auth/sign-in"> Войти </router-link>
        </div>
      </template>
    </app-sign-up>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppSignUp from '../../components/auth/sign-up/app-sign-up.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    'app-sign-up': AppSignUp,
  },
});
</script>

<style lang="scss" scoped>
.go_to {
  padding: 20px 0 0;
  font-weight: 700;
  font-size: 20px;
  text-align: center;

  a {
    color: var(--c_main);
  }
}
</style>
