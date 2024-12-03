<script setup lang="ts">
import HeaderComponent from '@/components/shared/HeaderComponent.vue'
import List from '@/components/posts/PostsList.vue'
</script>
<template>
  <HeaderComponent />
  <div class="flex flex-col bg-light">
    <List />
  </div>
</template>
