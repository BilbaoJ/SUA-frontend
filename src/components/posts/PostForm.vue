<template>
  <main class="absolute flex flex-col items-center w-screen h-full bg-black bg-opacity-50 z-40">
    <form
      @submit.prevent="submitForm()"
      class="fixed top-12 flex flex-col justify-center items-center gap-y-8 py-5 px-8 w-4/5 max-w-md h-fit rounded-lg bg-light"
    >
      <Icon
        @click="$emit('close')"
        class="absolute top-4 right-4 text-primary"
        icon="lets-icons:close-round"
        width="24"
        height="24"
      />
      <h2 class="text-2xl text-primary font-bold text-center">Create a new post</h2>
      <div class="flex flex-col gap-y-2 w-11/12 md:w-3/4">
        <label class="text-base font-medium text-primary" for="title">Title</label>
        <input
          v-model="post.title"
          class="h-10 px-4 py-2 rounded-lg border-accent"
          type="text"
          name="title"
          id="title"
        />
      </div>
      <div class="flex flex-col gap-y-2 w-11/12 md:w-3/4">
        <label class="text-base font-medium text-primary" for="body">Body</label>
        <textarea
          v-model="post.body"
          class="h-24 px-4 py-2 rounded-lg border-accent resize-none"
          name="body"
          id="body"
        ></textarea>
      </div>
      <button
        type="submit"
        class="px-2 py-1 w-11/12 md:w-3/4 rounded-lg text-white bg-primary hover:bg-accent hover:text-primary"
      >
        Save
      </button>
    </form>
  </main>
</template>
<script setup lang="ts">
import { ResponseTypes } from '@/models/enums/responseTypes'
import { createPost } from '@/services/postsService'
import { usePostsStore } from '@/stores/postsStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const postStore = usePostsStore()

const post = {
  userId: 0,
  id: postStore.posts.length + 1,
  title: '',
  body: '',
}
const emit = defineEmits(['submit', 'close'])

const submitForm = async () => {
  try {
    const token: string | null = localStorage.getItem('token')
    if (token) {
      const response = await createPost(token, post)
      if (response) {
        if (response.ok) {
          postStore.addPost(post)
          post.title = ''
          post.body = ''
          emit('close')
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
        emit('close')
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
