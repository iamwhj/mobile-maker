import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/index.scss';
import '@/plugins/echarts';
import registerGlobalComponent from '@/common/registerGlobalComponent';
import registerCustomComponents from './custom-components';

const app = createApp(App).use(store).use(router);

// 自定义组件全局注册
registerGlobalComponent(app);
registerCustomComponents(app);

app.mount('#app');
