import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './styles/main.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
