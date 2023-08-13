<template>
  <div class="white_conteiner sign_in">
    <h1>Вход</h1>
    <div class="sign_in__wrapper">
      <form class="sign_in__form">
        <div class="sign_in__field">
          <label
            for="sign-in-email"
            class="sign_in__label"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="sign-in-email"
            class="sign_in__input"
          />
        </div>
        <div class="sign_in__field">
          <label
            for="sign-in-password"
            class="sign_in__label"
          >
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="sign-in-password"
            class="sign_in__input"
          />
        </div>
        <div class="sign_in__field">
          <button
            type="submit"
            class="sign_in__btn btn"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  </div>
  <slot name="register"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.sign_in {
  padding: 20px 25px;
  max-width: 500px;
  margin: 0 auto;
}

.sign_in__form {
  margin-bottom: -20px;
}

.sign_in__field {
  margin-bottom: 20px;
}

.sign_in__label {
  display: block;
  font-weight: 700;
  font-size: 18px;
  color: #a5a2a2;
  margin-bottom: 5px;
}

.sign_in__input {
  border: none;
  border-radius: 5px;
  background-color: #dddcdc;
  padding: 10px 20px;
  width: 100%;
  font-weight: 500;
}

.sign_in__btn {
  font-size: 18px;
  letter-spacing: 0.03rem;
}
</style>
