import router from './router'
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import store from './store'

const app = createApp(App);

app.use(Antd).use(router).use(store).mount('#app');