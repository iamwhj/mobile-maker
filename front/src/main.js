import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import store from './store';
import '@/style/index.scss';
import registerCustomComponents from './custom-components';

const app = createApp(App).use(store).use(router).use(ElementPlus);

// 自定义组件全局注册
registerCustomComponents(app);

app.mount('#app');
