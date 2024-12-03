import type { User } from '../models/user'

const baseUrl = import.meta.env.VITE_API_URL

export const login = async (user: User) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return response.json()
}
