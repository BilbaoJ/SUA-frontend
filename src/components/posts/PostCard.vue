<template>
  <div
    class="flex flex-col relative w-full md:w-80 min-h-36 px-10 py-8 items-center rounded-xl border border-accent bg-white shadow-xl z-10"
  >
    <h2 class="mb-2 text-lg font-semibold uppercase text-primary">{{ props.post.title }}</h2>
    <hr class="h-px my-2 w-11/12 bg-light border-0" />
    <p class="mb-2 text-base leading-relaxed font-base text-secondary">{{ props.post.body }}</p>
    <button @click="deleteSelf()" class="absolute right-4 text-accent hover:text-secondary">
      <Icon icon="iconoir:trash-solid" width="20" height="20" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { ResponseTypes } from '@/models/enums/responseTypes'
import type { Post } from '@/models/post'
import { deletePost } from '@/services/postsService'
import { usePostsStore } from '@/stores/postsStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  post: { type: Object, required: true },
})

const router = useRouter()
const postStore = usePostsStore()

const deleteSelf = async () => {
  try {
    const token: string | null = localStorage.getItem('token')
    if (token) {
      const response = await deletePost(token, props.post.id)
      if (response) {
        if (response.ok) {
          postStore.deletePost(props.post as Post)
        } else {
          console.log('Este es el error' + response.status)
          alert(response.message)
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    switch (error.status) {
      case ResponseTypes.UNAUTHORIZED: {
        alert('Your session has expired')
        router.push('/')
        break
      }
      case ResponseTypes.BAD_REQUEST: {
        alert('You are not logged in')
        break
      }

      default:
        alert('An unexpected error occurred')
        break
    }
  }
}
</script>
