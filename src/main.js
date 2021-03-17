import { createApp } from 'vue'
import App from './App.vue'
import store from "../store";
import router from "../router";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';


const app = createApp(App)
//定义全局变量
//app.config.globalProperties.$post = post

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')