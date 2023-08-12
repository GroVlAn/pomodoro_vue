import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const vue = createApp(App);

vue.config.errorHandler = (err) => {
  console.log(err);
};

vue.use(router);

vue.mount('#app');
