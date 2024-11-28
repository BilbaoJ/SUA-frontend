import type { User } from '@/api/models/user'
import { login } from '@/api/services/usersService'
import { reactive } from 'vue'

const common = reactive({
  async login(user: User) {
    const response = await login(user)
    return response
  },
})

export default common
