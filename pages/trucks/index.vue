<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

definePageMeta({
  layout: "user",
});

const schema = z.object({
  number: z.string().min(8).max(9),
});
type Schema = z.output<typeof schema>;
const formState = reactive<Partial<Schema>>({
  number: undefined,
});
const { state: trucks, refresh } = useTrucks();
const router = useRouter();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { mutateAsync } = useCreateTuck();
  try {
    await mutateAsync(event.data);
    refresh();
  } catch (e) {
    console.error(e);
  }
}

const form = useTemplateRef("form");
</script>

<template>
  <div>
    <div class="flex gap-4 items-center justify-between">
      <h1>Машины</h1>
      <UForm ref="form" :schema="schema" :state="formState" @submit="onSubmit">
        <UModal title="Добавить машину" :ui="{ footer: 'justify-end' }">
          <UButton label="Добавить" />
          <template #body>
            <UFormField label="Гос. номер" name="number">
              <UInput v-model="formState.number" />
            </UFormField>
          </template>
          <template #footer>
            <UButton
              label="Подтвердить"
              class="justify-end"
              @click="form.submit()"
            />
          </template>
        </UModal>
      </UForm>
    </div>
    <div v-if="trucks.status === 'success'" class="flex gap-4 flex-wrap mt-8">
      <UCard
        v-for="truck in trucks.data"
        :key="truck.id"
        :ui="{ root: 'cursor-pointer' }"
        @click="router.push(`/trucks/${truck.id}`)"
      >
        <span class="text-2xl font-medium">{{ truck.number }}</span>
      </UCard>
    </div>
    <div v-else class="mt-8">
      <span>Нет машин</span>
    </div>
  </div>
</template>
