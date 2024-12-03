import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import { Icon } from '@iconify/vue'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Icon', Icon)

const authStore = useAuthStore()
authStore.initializeAuth()

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !authStore.isAuthenticated) next({ name: 'login' })
  else next()
})

app.use(router)
app.mount('#app')
