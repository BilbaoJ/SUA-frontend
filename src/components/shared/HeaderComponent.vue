<template>
  <nav class="hidden md:flex md:flex-col w-full h-14 px-4 text-light bg-primary z-50">
    <div class="flex justify-between items-center h-full w-full max-w-5xl self-center">
      <div>
        <h1 class="text-xl font-bold">Postly</h1>
      </div>
      <div class="flex h-full gap-6 justify-self-end text-base">
        <RouterLink
          class="flex h-full px-2 items-center gap-1 hover:bg-accent hover:text-primary"
          to="/posts"
        >
          <Icon icon="solar:posts-carousel-vertical-bold-duotone" />
          Posts
        </RouterLink>
        <button
          class="flex h-full px-2 items-center gap-1 hover:bg-accent hover:text-primary"
          @click="logOut"
        >
          <Icon icon="majesticons:logout-line" />
          Log out
        </button>
      </div>
    </div>
  </nav>
  <nav
    class="flex justify-center items-center space-x-6 w-full h-16 fixed left-0 bottom-0 text-3xl text-white bg-primary z-50 md:hidden"
  >
    <div>
      <RouterLink to="/posts">
        <Icon icon="solar:posts-carousel-vertical-bold-duotone" />
      </RouterLink>
    </div>
    <div>
      <h1>Postly</h1>
    </div>
    <div>
      <button @click="logOut">
        <Icon icon="majesticons:logout-line" />
      </button>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logOut = () => {
  localStorage.clear()
  router.push('/')
}
</script>
