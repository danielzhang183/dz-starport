import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import Starport from 'dz-starport'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app
  .use(router)
  .use(Starport({ keepAlive: true }))
  .mount('#app')
