import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies';

const vue = createApp(App);

vue.config.errorHandler = (err) => {
  console.log(err);
};

vue.use(router);
vue.use(VueCookies, { expires: '7d' });

vue.mount('#app');
