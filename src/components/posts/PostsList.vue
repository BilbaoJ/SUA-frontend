<template>
  <main class="flex flex-col relative items-center lg:max-w-7xl self-center">
    <h1 class="text-4xl font-bold text-primary mb-4 mt-6">Posts</h1>
    <p class="text-base font-thin text-secondary">Explore and manage your posts</p>
    <hr class="h-px my-4 w-4/5 bg-accent border-0" />
    <div
      class="flex flex-col gap-y-8 w-full h-fit px-4 mt-4 mb-24 md:flex-row md:gap-x-8 md:flex-wrap md:justify-center"
    >
      <PostCard v-for="post in store.posts" v-bind:key="post.id" :post="post" />
    </div>
    <button
      @click="showForm"
      type="button"
      class="flex gap-0 items-center fixed right-4 bottom-20 md:right-2 md:bottom-2 shadow-2xl z-30 text-primary cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200"
    >
      <Icon icon="icon-park-solid:add" width="53" height="53" />
    </button>

    <PostForm v-if="isFormVisible" @close="closeForm"></PostForm>
  </main>
</template>
<script setup lang="ts">
import PostCard from './PostCard.vue'
import PostForm from './PostForm.vue'
import { onBeforeMount, ref } from 'vue'
import { getPosts } from '@/services/postsService'
import { ResponseTypes } from '@/models/enums/responseTypes'
import { usePostsStore } from '@/stores/postsStore'
import router from '@/router'

const store = usePostsStore()

const isFormVisible = ref(false)

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
          console.log('Este es el error' + response.status)
          alert(response.message)
        }
      }
    } else {
      alert('Not auteneicated')
      router.push('/')
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

const showForm = () => {
  isFormVisible.value = true
}

const closeForm = () => {
  isFormVisible.value = false
}
</script>
