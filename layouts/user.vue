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
]);
</script>

<template>
  <div>
    <header>
      <UContainer>
        <UNavigationMenu :items="items" />
      </UContainer>
    </header>
    <main>
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>
