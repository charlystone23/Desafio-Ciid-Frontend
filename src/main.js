import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from './modules/axios'


import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)


//app.config.globalProperties.$axios={axios}
/* export const install = ({ app }) => {
    app.config.globalProperties.$modules = {
    axios
};
}; */


app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
