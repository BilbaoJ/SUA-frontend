import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    initializeAuth() {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
    },
    logout() {
      localStorage.clear()
      this.isAuthenticated = false
    },
  },
})
