<script setup>
const items = ref([
  {
    label: "Машины",
    to: "/trucks",
  },
  {
    label: "Клиенты",
    to: "/clients",
  },
  {
    label: "Водители",
    to: "/drivers",
  },
]);

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <div>
    <header>
      <UContainer class="flex justify-between">
        <UNavigationMenu :items="items" />
        <ClientOnly v-if="!colorMode?.forced">
          <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="size-8" />
          </template>
        </ClientOnly>
      </UContainer>
    </header>
    <main class="mt-8">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>
