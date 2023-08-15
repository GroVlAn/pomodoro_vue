<template>
  <div class="white_conteiner sign_up">
    <h1>Регистрация</h1>
    <div class="sign_up__wrapper">
      <form
        @submit.prevent="signUp"
        class="sign_up__form"
      >
        <div
          v-show="errors.form"
          class="form_error this--mb"
        >
          {{ errors.form }}
        </div>
        <div class="sign_up__field">
          <label
            for="sign-up-name"
            class="sign_up__label"
          >
            Логин
          </label>
          <input
            type="name"
            name="username"
            v-model="user.username"
            id="sign-up-name"
            class="sign_up__input"
          />
          <div
            v-show="errors.username"
            class="form_error this--mt"
          >
            {{ errors.username }}
          </div>
        </div>
        <div class="sign_up__field">
          <label
            for="sign-up-email"
            class="sign_up__label"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            v-model="user.email"
            id="sign-up-email"
            class="sign_up__input"
          />
          <div
            v-show="errors.email"
            class="form_error this--mt"
          >
            {{ errors.email }}
          </div>
        </div>
        <div class="sign_up__field">
          <label
            for="sign-up-password"
            class="sign_up__label"
          >
            Пароль
          </label>
          <input
            type="password"
            name="password"
            v-model="user.password"
            id="sign-up-password"
            class="sign_up__input"
          />
          <div
            v-for="(error, key) in errors.password"
            :key="key"
            class="form_error this--mt"
          >
            {{ error }}
          </div>
        </div>
        <div class="sign_up__field">
          <label
            for="sign-up-confirm-password"
            class="sign_up__label"
          >
            Подтверждение пароля
          </label>
          <input
            type="password"
            name="confirmPassword"
            v-model="confirmPassword"
            id="sign-up-confirm-password"
            class="sign_up__input"
          />
          <div
            v-show="errors.password"
            class="form_error this--mt"
          >
            {{ errors.confirmPassword }}
          </div>
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
import { TUser } from '@/shared/types/user';
import { defineComponent, reactive, ref } from 'vue';
import { passwordValidator, register } from './service';
import router from '@/router';
import { TErroResponse } from '@/shared/api/store/types';
import { AxiosError } from 'axios';
import { globalStore } from '@/shared/api/store/store';

export default defineComponent({
  setup() {
    const user = ref({
      id: null,
      username: '',
      email: '',
      password: '',
      role_id: 1,
    } as TUser);
    const confirmPassword = ref('');
    const errors = reactive({
      username: '',
      password: [] as Array<string>,
      email: '',
      confirmPassword: '',
      form: '',
    });

    const errorHandler = (response: TErroResponse) => {
      if (response.status === 422) {
        if (response.data.detail instanceof Array) {
          response.data.detail.forEach((item) => {
            if (item.loc[1] === 'email') {
              errors.email = 'Некорректный email';
            }
          });
        }
      }

      if (response.status === 400) {
        if (response.data.detail === 'REGISTER_USER_ALREADY_EXISTS') {
          errors.email = 'Пользователь уже существует';
        }
      }
    };

    const validateFields = () => {
      const emptyField = 'Пустое поле';

      const { username, email, password } = user.value;

      errors.username = username === '' ? emptyField : '';
      errors.email = email === '' ? emptyField : '';
      errors.confirmPassword = confirmPassword.value === '' ? emptyField : '';

      const passwordErrors = passwordValidator(password);
      errors.password = passwordErrors.length > 0 ? passwordErrors : [];

      if (user.value.password != confirmPassword.value) {
        errors.confirmPassword = 'Пароли не совпадают';
      }

      return (
        errors.username === '' &&
        errors.email === '' &&
        errors.password.length === 0 &&
        errors.confirmPassword === ''
      );
    };

    const signUp = async () => {
      errors.form = '';
      errors.username = '';
      errors.email = '';
      errors.password = [];
      errors.confirmPassword = '';

      if (!validateFields()) {
        return;
      }

      globalStore.isLoading = true;

      try {
        const response = await register(user.value);

        if (response.status !== 201) {
          return;
        }

        router.replace('/auth/sign-in');
      } catch (error) {
        console.log(error);

        if (error instanceof AxiosError) {
          if (error.code === 'ERR_NETWORK') {
            errors.form = 'Ошибка сети';
            return;
          }
          errorHandler(error.response as TErroResponse);
        }
      } finally {
        globalStore.isLoading = false;
      }
    };

    return {
      signUp,
      user,
      confirmPassword,
      errors,
    };
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
