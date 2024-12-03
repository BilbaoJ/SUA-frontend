<template>
  <div
    class="flex flex-col relative w-full md:w-80 min-h-36 px-10 py-8 items-center rounded-xl border border-accent bg-white shadow-xl z-10"
  >
    <h2 class="mb-2 text-lg font-semibold uppercase text-primary">{{ props.post.title }}</h2>
    <hr class="h-px my-2 w-11/12 bg-light border-0" />
    <p class="mb-2 text-base leading-relaxed font-base text-secondary">{{ props.post.body }}</p>
    <button class="absolute right-4 text-accent hover:text-secondary">
      <Icon icon="iconoir:trash-solid" width="20" height="20" />
    </button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  post: { type: Object, required: true },
})
</script>
