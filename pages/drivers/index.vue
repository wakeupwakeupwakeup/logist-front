<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";
import { useCreateDriver } from "~/composables/useCreateDriver";

definePageMeta({
  layout: "user",
});

const addDriverSchema = z.object({
  login: z.string().min(3).max(15),
  password: z.string().min(3).max(15),
});
const attachTruckSchema = z.object({
  truck: z.number(),
});

const addDriverForm = useTemplateRef("addDriverForm");
const attachTruckForm = useTemplateRef("attachTruckForm");

type addDriverSchema = z.output<typeof addDriverSchema>;
type attachTruckSchema = z.output<typeof attachTruckSchema>;

const addDriverFormState = reactive<Partial<addDriverSchema>>({
  login: undefined,
  password: undefined,
});

const attachTruckFormState = reactive<Partial<attachTruckSchema>>({
  truck: undefined,
});

const { state, refresh } = useDrivers();
const { state: trucks } = useTrucks();

async function onDriverSubmit(event: FormSubmitEvent<addDriverSchema>) {
  const { mutateAsync } = useCreateDriver();
  try {
    await mutateAsync({ ...event.data });
    refresh();
  } catch (e) {
    console.error(e);
  }
}

const selectedDriver = ref<number | null>(null);

async function onTruckSubmit(event: FormSubmitEvent<attachTruckSchema>) {
  const { mutateAsync } = useAttachTruck();
  try {
    await mutateAsync({
      target: "driver",
      targetId: selectedDriver.value,
      truckId: event.data.truck,
    });
    refresh();
  } catch (e) {
    console.error(e);
  }
}

const openDeleteModal = ref(false);
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1>Водители</h1>
      <UForm
        ref="addDriverForm"
        :schema="addDriverSchema"
        :state="addDriverFormState"
        @submit="onDriverSubmit"
      >
        <UModal title="Добавить водителя" :ui="{ footer: 'justify-end' }">
          <UButton label="Добавить" />
          <template #body>
            <UFormField label="Логин" name="login">
              <UInput v-model="addDriverFormState.login" />
            </UFormField>
            <UFormField label="Пароль" name="password">
              <UInput v-model="addDriverFormState.password" />
            </UFormField>
          </template>
          <template #footer>
            <UButton
              label="Подтвердить"
              class="justify-end"
              @click="addDriverForm.submit()"
            />
          </template>
        </UModal>
      </UForm>
    </div>
    <div v-if="state.status === 'success'" class="flex gap-4 flex-wrap mt-8">
      <UCard
        v-for="driver in state.data"
        :key="driver.id"
        @click="selectedDriver = driver.id"
      >
        <span class="text-2xl font-medium">{{ driver.login }}</span>
        <template #footer>
          <div class="flex gap-4">
            <UModal
              v-model:open="openDeleteModal"
              title="Удалить водителя"
              description="Вы действительно хотите удалить водителя?"
            >
              <UButton
                label="Удалить"
                color="error"
                variant="ghost"
                class="w-full"
              />
              <template #footer>
                <div class="flex justify-end w-full gap-4">
                  <UButton
                    label="Отменить"
                    variant="ghost"
                    @click="openDeleteModal = false"
                  />
                  <UButton label="Подтвердить" color="error" variant="soft" />
                </div>
              </template>
            </UModal>
            <UModal title="Прикрепить машину">
              <UButton label="Назначить машину" class="w-full" variant="soft" />
              <template #body>
                <UForm
                  ref="attachTruckForm"
                  :schema="attachTruckSchema"
                  :state="attachTruckFormState"
                  @submit="onTruckSubmit"
                >
                  <UFormField>
                    <USelect
                      v-model="attachTruckFormState.truck"
                      class="w-48"
                      :items="
                        trucks.data?.map((truck) => ({
                          value: truck.id,
                          label: truck.number,
                        })) || []
                      "
                      :placeholder="
                        !trucks.data?.length
                          ? 'Нет доступных машин'
                          : 'Выберите машину'
                      "
                      :disabled="!trucks.data?.length"
                      :loading="trucks.status === 'pending'"
                    />
                  </UFormField>
                  <UButton type="submit" label="Подтвердить" variant="soft" />
                </UForm>
              </template>
              <!-- <template #footer>
                <div class="flex justify-end w-full">
                  
                </div>
              </template> -->
            </UModal>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
