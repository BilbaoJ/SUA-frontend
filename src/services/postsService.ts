import type { Post } from '@/models/post'

const baseUrl = import.meta.env.VITE_API_URL

export const getPosts = async (token: string) => {
  const response = await fetch(`${baseUrl}/posts/user/1`, {
    method: 'GET',
    headers: { token },
  })
  if (!response.ok) {
    const errorResponse = await response.json()
    throw { status: response.status, ...errorResponse }
  }
  return await response.json()
}

export const createPost = async (token: string, post: Post) => {
  const response = await fetch(`${baseUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: { token },
  })
  if (!response.ok) {
    const errorResponse = await response.json()
    throw { status: response.status, ...errorResponse }
  }
  return await response.json()
}

export const updatePost = async (token: string, post: Post) => {
  const response = await fetch(`${baseUrl}/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: { token },
  })
  if (!response.ok) {
    const errorResponse = await response.json()
    throw { status: response.status, ...errorResponse }
  }
  return await response.json()
}

export const deletePost = async (token: string, id: number) => {
  const response = await fetch(`${baseUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: { token },
  })
  if (!response.ok) {
    const errorResponse = await response.json()
    throw { status: response.status, ...errorResponse }
  }
  return await response.json()
}
