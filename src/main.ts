import pinia from '@/store'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import vClickOutside from 'click-outside-vue3'

import './assets/scss/reset.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vClickOutside)

app.mount('#app')
