<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { TClient } from "~/types/client";
import type { Row } from "@tanstack/vue-table";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const {
  public: { apiBase },
} = useRuntimeConfig();

definePageMeta({
  layout: "user",
});

const router = useRouter();

function getRowItems(row: Row<TClient>) {
  return [
    {
      label: "Адреса",
      onSelect() {
        router.push(`/clients/${row.original.id}`);
      },
    },
  ];
}

const { state, refresh } = useClients();
const columns: TableColumn<TClient>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Наименование",
  },
  {
    accessorKey: "contacts",
    header: "Контакты",
  },
  {
    id: "actions",
    cell: ({ row }) =>
      h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
          },
          () =>
            h(UButton, {
              icon: "lucide:ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
            })
        )
      ),
  },
];

async function handleFile(event: Event) {
  if (event.target) {
    const file = event.target.files[0];
    const input = event.target;
    console.log(file);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await $fetch(apiBase + "/clients/upload", {
          method: "POST",
          body: formData,
        });
        refresh();
      } catch (e) {
        console.error(e);
      } finally {
        input.value = "";
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="flex gap-4 justify-between mb-8">
      <h1>Клиенты</h1>
      <div class="flex items-center gap-2">
        <UPopover mode="hover">
          <UIcon name="i-lucide-info" />
          <template #content>
            <p class="p-2">
              При загрузке клиента из таблицы (.xls), укажите наименование
              клиента в названии листа
            </p>
          </template>
        </UPopover>
        <UInput type="file" accept=".xlsx" @change="handleFile" />
      </div>
    </div>
    <UTable
      :data="state.data"
      :columns="columns"
      :loading="state.status === 'pending'"
      class="flex-1"
    />
  </div>
</template>
