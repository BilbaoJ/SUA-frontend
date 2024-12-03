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
      <h2 class="text-2xl text-primary font-bold text-center">
        {{ isEditMode ? 'Update the post' : 'Create a post' }}
      </h2>
      <div class="flex flex-col gap-y-2 w-11/12 md:w-3/4">
        <label class="text-base font-medium text-primary" for="title">Title</label>
        <input
          v-model="form.title"
          class="h-10 px-4 py-2 rounded-lg border-accent"
          type="text"
          name="title"
          id="title"
        />
      </div>
      <div class="flex flex-col gap-y-2 w-11/12 md:w-3/4">
        <label class="text-base font-medium text-primary" for="body">Body</label>
        <textarea
          v-model="form.body"
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
import type { Post } from '@/models/post'
import { createPost, updatePost } from '@/services/postsService'
import { usePostsStore } from '@/stores/postsStore'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const postStore = usePostsStore()

const props = defineProps({
  post: {
    type: Object,
    required: false,
    default: () => ({
      userId: 1,
      title: '',
      body: '',
    }),
  },
})
const isEditMode = props.post?.id !== undefined

const form = {
  ...props.post,
} as Post

const emit = defineEmits(['submit', 'close'])

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 3000,
})

const submitForm = async () => {
  try {
    const token: string | null = localStorage.getItem('token')
    if (token) {
      let response
      if (isEditMode) {
        response = await updatePost(token, form)
      } else {
        form.id = postStore.posts.length + 1
        response = await createPost(token, form)
      }
      if (response) {
        if (response.ok) {
          postStore.addPost(form)
          emit('close')
          Toast.fire({
            icon: 'success',
            title: 'Your post has been saved',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message,
          })
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    switch (error.status) {
      case ResponseTypes.UNAUTHORIZED: {
        emit('close')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your session has expired',
        })
        localStorage.clear()
        router.push('/')
        break
      }
      case ResponseTypes.BAD_REQUEST: {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You are not logged in',
        })
        router.push('/')
        break
      }

      default:
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An unexpected error occurred',
        })
        break
    }
  }
}
</script>
