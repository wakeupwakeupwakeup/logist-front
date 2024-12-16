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
</script>

<template>
  <div>
    <header>
      <UContainer>
        <UNavigationMenu :items="items" />
      </UContainer>
    </header>
    <main class="mt-8">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>
