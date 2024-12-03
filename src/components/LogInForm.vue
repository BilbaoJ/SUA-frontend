<template>
  <main class="flex flex-col gap-y-2 w-full max-w-md px-4 md:w-1/2 md:justify-center md:px-8">
    <h1 class="text-3xl font-semibold text-primary">Login</h1>
    <p class="text-base font-normal text-secondary">Please sign in to continue</p>
    <form @submit.prevent="logIn()" class="flex flex-col gap-y-6 w-full h-fit mt-2">
      <div class="flex flex-col gap-y-1 w-full">
        <label class="px-1 text-base font-medium text-primary" for="user_email">Email</label>
        <div class="flex items-center px-4 rounded-full text-sm text-primary bg-light">
          <Icon icon="uil:user" />
          <input
            v-model="user.email"
            class="w-full ml-2 text-base bg-light border-none focus:ring-0"
            id="user_email"
            name="user_email"
            type="email"
            placeholder="123@example.com"
          />
        </div>
      </div>
      <div class="flex flex-col gap-y-1 w-full">
        <label class="px-1 text-base font-medium text-primary" for="user_password">Password</label>
        <div class="flex items-center px-4 rounded-full text-sm text-primary bg-light">
          <Icon icon="tabler:lock" />
          <input
            v-model="user.password"
            class="w-full ml-2 text-base bg-light border-none focus:ring-0"
            id="user_password"
            name="user_password"
            type="password"
          />
        </div>
      </div>
      <div class="w-full">
        <button
          type="submit"
          class="w-full px-2 py-1 rounded-full text-sm font-bold text-white bg-primary hover:bg-accent hover:text-primary"
        >
          Sign in
        </button>
      </div>
    </form>
  </main>
</template>
<script setup lang="ts">
import { login } from '@/services/authService'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const store = useAuthStore()

const router = useRouter()
const user = {
  email: '',
  password: '',
}

const logIn = async () => {
  try {
    const response = await login(user)
    if (response) {
      if (response.ok) {
        const token = response.info.token
        const userName = response.info.name
        localStorage.setItem('token', token)
        localStorage.setItem('user', userName)
        store.isAuthenticated = true
        router.push('/posts')
      } else {
        alert(response.message)
      }
    }
  } catch (error) {
    alert('Unexpected error ' + error)
  }
}
</script>
