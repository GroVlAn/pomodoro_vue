<template>
  <div class="container">
    <section class="section">
      <app-sign-in>
        <template #register>
          <div class="go_to">
            <router-link to="/auth/sign-up"> Создать аккаунт </router-link>
          </div>
        </template>
      </app-sign-in>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppSignIn from '../../components/auth/sign-in/app-sign-in.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    'app-sign-in': AppSignIn,
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
