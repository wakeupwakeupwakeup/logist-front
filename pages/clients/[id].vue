<script setup lang="ts">
import type { FormSubmitEvent, TableColumn } from "@nuxt/ui";
import type { TAddress } from "~/types/address";
import type { Row } from "@tanstack/vue-table";
import { z } from "zod";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

definePageMeta({
  layout: "user",
});

const { state: trucks } = useTrucks();
const { state: client, refresh } = useClient();
const open = ref(false);
const selectedAddress = ref<number | null>(null);

const schema = z.object({
  number: z.number(),
});
type Schema = z.output<typeof schema>;
const formState = reactive<Partial<Schema>>({
  number: undefined,
});

function getRowItems(row: Row<TAddress>) {
  return [
    {
      label: "Закрепить машину",
      onSelect() {
        selectedAddress.value = row.original.id;
        open.value = true;
      },
    },
    {
      label: "Удалить",
    },
  ];
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
    accessorKey: "truck",
    header: "Машина",
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
async function onSubmit(event: FormSubmitEvent<any>) {
  console.log(selectedAddress);

  console.log(event.data);
  const { mutateAsync } = useAttachTruck();

  try {
    await mutateAsync({
      target: "address",
      targetId: selectedAddress.value!,
      truckId: event.data.number,
    });
    refresh();
    open.value = false;
  } catch (e) {
    console.error(e);
  }
}
const form = useTemplateRef("form");
</script>

<template>
  <div>
    <div class="flex gap-4 justify-between items-center mb-8">
      <h1>{{ client.data?.name }}</h1>
    </div>
    <UTable
      :sorting="[{ id: 'truck', desc: true }]"
      :data="client.data?.addresses"
      :columns="columns"
      :loading="client.status === 'pending'"
      class="flex-1"
    />
    <UModal v-model:open="open" title="Прикрепить машину">
      <template #body>
        <UForm
          ref="form"
          :schema="schema"
          :state="formState"
          @submit="onSubmit"
        >
          <UFormField label="Гос. номер" name="number">
            <USelect
              v-model="formState.number"
              class="w-48"
              :items="
                trucks.data?.map((truck) => ({
                  value: truck.id,
                  label: truck.number,
                })) || []
              "
              :placeholder="
                !trucks.data?.length ? 'Нет доступных машин' : 'Выберите машину'
              "
              :disabled="!trucks.data?.length"
              :loading="trucks.status === 'pending'"
            />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <UButton
          label="Подтвердить"
          class="justify-end"
          @click="form.submit()"
        />
      </template>
    </UModal>
  </div>
</template>
