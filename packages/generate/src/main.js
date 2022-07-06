import { createApp } from 'vue';
import App from './App.vue';
import '@/style/index.scss';
import '@/common/rem';
import registerCustomComponents from './custom-components';

const app = createApp(App);

// 注册组件
registerCustomComponents(app);

app.mount('#app');
