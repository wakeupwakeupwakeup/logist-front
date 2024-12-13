import { defineQuery, useQuery } from "@pinia/colada";
import type { TTruck } from "~/types/truck";

export const useTruck = defineQuery(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const route = useRoute();
  const query = useQuery<TTruck[]>({
    key: ["truck", route.params.id as string],
    query: () => $fetch(apiBase + `/trucks/${route.params.id}`),
  });
  return { ...query };
});
