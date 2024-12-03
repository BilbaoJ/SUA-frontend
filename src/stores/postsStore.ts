import type { Post } from '@/models/post'
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    updatePosts(posts: Post[]) {
      this.posts = posts
    },
    addPost(newPost: Post) {
      const exists = this.posts.filter((p) => p.id === newPost.id)
      if (exists.length > 0) {
        this.posts = this.posts.map((p) => (p.id === newPost.id ? newPost : p))
      } else {
        this.posts.unshift({ ...newPost })
      }
    },
    deletePost(postD: Post) {
      this.posts = this.posts.filter((post) => post.id !== postD.id)
    },
  },
})
