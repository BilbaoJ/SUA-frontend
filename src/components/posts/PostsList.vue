<template>
  <main class="flex flex-col relative items-center lg:max-w-7xl self-center">
    <h1 class="text-4xl font-bold text-primary mb-4 mt-6">Posts</h1>
    <p class="text-base font-thin text-secondary">Explore and manage your posts</p>
    <hr class="h-px my-4 w-4/5 bg-accent border-0" />
    <div
      class="flex flex-col gap-y-8 w-full h-fit px-4 mt-4 mb-24 md:flex-row md:gap-x-8 md:flex-wrap md:justify-center"
    >
      <div
        class="relative cursor-pointer"
        @click="editPost(post)"
        v-for="post in store.posts"
        v-bind:key="post.id"
      >
        <button
          @click.stop="deleteOnePost(post)"
          class="absolute -top-2 -right-3 text-accent bg-primary p-2 rounded-full hover:text-secondary z-20"
        >
          <Icon icon="iconoir:trash-solid" width="20" height="20" />
        </button>
        <PostCard :post="post" />
      </div>
    </div>
    <button
      @click="showForm"
      type="button"
      class="flex gap-0 items-center fixed right-4 bottom-20 md:right-2 md:bottom-2 shadow-2xl z-30 text-primary cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200"
    >
      <Icon icon="icon-park-solid:add" width="53" height="53" />
    </button>
    <PostForm v-if="isFormVisible" @close="closeForm" :post="selectedPost"></PostForm>
  </main>
</template>
<script setup lang="ts">
import PostCard from './PostCard.vue'
import PostForm from './PostForm.vue'
import { onBeforeMount, ref } from 'vue'
import { deletePost, getPosts } from '@/services/postsService'
import { ResponseTypes } from '@/models/enums/responseTypes'
import { usePostsStore } from '@/stores/postsStore'
import type { Post } from '@/models/post'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const store = usePostsStore()
const router = useRouter()
const isFormVisible = ref(false)
const selectedPost = ref({})

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 3000,
})

onBeforeMount(async () => {
  await loadPosts()
})

const loadPosts = async () => {
  try {
    const token: string | null = localStorage.getItem('token')
    if (token) {
      const response = await getPosts(token)
      if (response) {
        if (response.ok) {
          const reversedPosts = response.info.reverse()
          store.updatePosts(reversedPosts)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message,
          })
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not logged in',
      })
      router.push('/')
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    switch (error.status) {
      case ResponseTypes.UNAUTHORIZED: {
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

const showForm = () => {
  isFormVisible.value = true
}

const closeForm = () => {
  isFormVisible.value = false
  selectedPost.value = {}
}

const editPost = (post: Post) => {
  selectedPost.value = post
  showForm()
}

const deleteOnePost = async (post: Post) => {
  isFormVisible.value = false
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#27374D',
      cancelButtonColor: '#526D82',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token: string | null = localStorage.getItem('token')
        if (token) {
          const response = await deletePost(token, post.id)
          if (response) {
            if (response.ok) {
              Toast.fire({
                icon: 'success',
                title: 'Your post has been deleted.',
              })
              store.deletePost(post)
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.message,
              })
            }
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are not logged in',
          })
          router.push('/')
        }
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    switch (error.status) {
      case ResponseTypes.UNAUTHORIZED: {
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
