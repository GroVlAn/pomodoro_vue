<template>
  <div class="white_conteiner sign_in">
    <h1>Вход</h1>
    <div class="sign_in__wrapper">
      <form
        @submit.prevent="signIn"
        class="sign_in__form"
      >
        <div
          v-show="errorForm.form"
          class="form_error this--mb"
        >
          {{ errorForm.form }}
        </div>
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
            v-model="email"
            id="sign-in-email"
            class="sign_in__input"
          />
          <div
            v-show="errorForm.email"
            class="form_error this--mt"
          >
            {{ errorForm.email }}
          </div>
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
            v-model="password"
            id="sign-in-password"
            class="sign_in__input"
          />
          <div
            v-show="errorForm.password"
            class="form_error this--mt"
          >
            {{ errorForm.password }}
          </div>
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
import { defineComponent, reactive, ref } from 'vue';
import { login, getUser } from './service';
import { globalStore } from '@/shared/api/store/store';
import { TUser } from '@/shared/types/user';
import router from '@/router';
import { TErroResponse } from '@/shared/api/store/types';
import { AxiosError } from 'axios';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const errorsForm = reactive({
      email: '',
      password: '',
      form: '',
    });

    const errorHandler = (response: TErroResponse) => {
      if (response.status === 422) {
        if (response.data.detail instanceof Array) {
          response.data.detail.forEach((item) => {
            if (item.loc[1] === 'username' || item.loc[1] === 'password') {
              errorsForm.form = 'Неверный логин или пароль';
            }
          });
        }
      }

      if (response.status === 400) {
        if (response.data.detail === 'LOGIN_BAD_CREDENTIALS') {
          errorsForm.form = 'Неверный логин или пароль';
        }
      }
    };

    const validateForm = () => {
      const emptyField = 'Пустое поле';

      errorsForm.email = email.value === '' ? emptyField : '';
      errorsForm.password = password.value === '' ? emptyField : '';

      return errorsForm.email === '' && errorsForm.password === '';
    };

    const signIn = async () => {
      errorsForm.form = '';
      errorsForm.email = '';
      errorsForm.password = '';

      if (!validateForm()) {
        return;
      }
      globalStore.isLoading = true;
      try {
        const responseLogin = await login(email.value, password.value);

        if (responseLogin.status !== 204) {
          errorsForm.form = 'Неверный логин или пароль';
          return;
        }

        const responseGetUser = await getUser();

        if (responseGetUser.status !== 200) {
          errorHandler(responseGetUser);
          return;
        }

        const user = responseGetUser.data as TUser;

        if (!user.id) {
          return;
        }

        localStorage.setItem('user', user.id.toString());
        globalStore.userId = localStorage.getItem('user');
        router.replace('/');
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.code === 'ERR_NETWORK') {
            errorsForm.form = 'Ошибка сети';
            return;
          }
          errorHandler(error.response as TErroResponse);
        }
      } finally {
        globalStore.isLoading = false;
      }
    };

    return {
      signIn,
      email,
      password,
      errorForm: errorsForm,
    };
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
