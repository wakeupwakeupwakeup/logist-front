<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
console.log(props.error);
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <h1>Ошибка на пути {{ props.error?.url }}:</h1>
    <p>{{ props.error?.message }}</p>
    <NuxtLink to="/" class="mt-8">Вернуться на домашнюю страницу</NuxtLink>
  </div>
</template>
