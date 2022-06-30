import { createApp } from 'vue';
import App from './App.vue';
import registerCustomComponents from './custom-components';
import '@/common/rem';

const app = createApp(App);

// 注册组件
registerCustomComponents(app);

app.mount('#app');
