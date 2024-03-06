import { createApp } from 'vue'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import App from './App.vue'

createApp(App)
.use(createPinia()
    .use(piniaPluginPersistedstate)
)
.use(ElementPlus)
.mount('#app')
