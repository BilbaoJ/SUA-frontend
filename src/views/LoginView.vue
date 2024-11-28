<script setup lang="ts">
import LogInForm from '@/components/LogInForm.vue'
</script>
<template>
  <main
    class="flex flex-col md:flex-row py-8 px-4 w-full font-custom md:justify-center md:h-screen"
  >
    <figure class="w-60 max-w-md h-60 md:w-1/2 self-center">
      <img
        class="w-full h-full bg-cover bg-no-repeat bg-center"
        src="../assets/login.svg"
        alt="login image"
      />
    </figure>
    <LogInForm />
  </main>
</template>
