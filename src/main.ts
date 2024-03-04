import { createApp } from 'vue'
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import './style.css'
import App from './App.vue'

createApp(App)
.use(createPinia())
.use(ElementPlus)
.mount('#app')
