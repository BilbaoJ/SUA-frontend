<template>
  <div
    class="flex flex-col relative w-full md:w-80 min-h-36 max-w-72 px-10 py-8 items-center rounded-xl border border-accent bg-white text-wrap shadow-xl z-10 cursor-pointer overflow-x-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
  >
    <h2 class="mb-2 text-lg font-semibold uppercase text-primary break-words text-center">
      {{ props.post.title }}
    </h2>
    <hr class="h-px my-2 w-11/12 bg-light border-0" />
    <p class="mb-2 text-base leading-relaxed font-base text-secondary break-words">
      {{ props.post.body }}
    </p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  post: { type: Object, required: true },
})
</script>
