<template>
  <div class="white_conteiner sign_up">
    <h1>Регистрация</h1>
    <div class="sign_up__wrapper">
      <form class="sign_up__form">
        <div class="sign_up__field">
          <label
            for="sign-in-name"
            class="sign_up__label"
          >
            Логин
          </label>
          <input
            type="name"
            name="username"
            id="sign-in-name"
            class="sign_up__input"
          />
        </div>
        <div class="sign_up__field">
          <label
            for="sign-in-email"
            class="sign_up__label"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="sign-in-email"
            class="sign_up__input"
          />
        </div>
        <div class="sign_up__field">
          <label
            for="sign-in-password"
            class="sign_up__label"
          >
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="sign-in-password"
            class="sign_up__input"
          />
        </div>
        <div class="sign_up__field">
          <button
            type="submit"
            class="sign_up__btn btn"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  </div>
  <slot name="login"></slot>
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
.sign_up {
  padding: 20px 25px;
  max-width: 500px;
  margin: 0 auto;
}

.sign_up__form {
  margin-bottom: -20px;
}

.sign_up__field {
  margin-bottom: 20px;
}

.sign_up__label {
  display: block;
  font-weight: 700;
  font-size: 18px;
  color: #a5a2a2;
  margin-bottom: 5px;
}

.sign_up__input {
  border: none;
  border-radius: 5px;
  background-color: #dddcdc;
  padding: 10px 20px;
  width: 100%;
  font-weight: 500;
}

.sign_up__btn {
  font-size: 18px;
  letter-spacing: 0.03rem;
}
</style>
