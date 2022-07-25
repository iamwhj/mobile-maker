import { createApp } from 'vue';
import App from './App.vue';
import '@/style/index.scss';
import '@/common/rem';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/plugins/echarts';
import registerCustomComponents from './custom-components';

const app = createApp(App).use(ElementPlus);

// 注册组件
registerCustomComponents(app);

app.mount('#app');
