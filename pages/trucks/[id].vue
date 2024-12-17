<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { useChangePriority } from "~/composables/useChangePriority";
import type { TAddress } from "~/types/address";

definePageMeta({
  layout: "user",
});

const USelect = resolveComponent("USelect");

const { state, refresh } = useTruckAddresses();

const addressesCount = computed(
  () =>
    state.value.data?.map((_, index) => ({
      label: index,
      value: index,
    })) || []
);

async function changePriority(addressId: number, priority: number) {
  const { mutateAsync } = useChangePriority();
  try {
    await mutateAsync({ addressId, priority });
    refresh();
  } catch (e) {
    console.error(e);
  }
}

const columns: TableColumn<TAddress>[] = [
  {
    accessorKey: "address",
    header: "Адрес",
  },
  {
    accessorKey: "containers.count",
    header: "Контейнеры",
  },
  {
    accessorKey: "containers.volume",
    header: "Объём, м3",
  },
  {
    accessorKey: "schedule",
    header: "График",
  },
  {
    accessorKey: "contacts",
    header: "Контакты",
  },
  {
    accessorKey: "priority",
    header: "Приоритет",
    cell: ({ row }) =>
      h(USelect, {
        items: addressesCount.value,
        value: row.original.priority || "0",
        "onUpdate:modelValue": (payload: number) =>
          changePriority(row.original.id, payload),
      }),
  },
];
</script>

<template>
  <div>
    <UTable
      :data="state.data"
      :columns="columns"
      :loading="state.status === 'pending'"
      class="flex-1"
    >
      <template #empty>
        <p>Нет адресов</p>
      </template>
    </UTable>
  </div>
</template>
