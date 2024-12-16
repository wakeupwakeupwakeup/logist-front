import { defineQuery, useQuery } from "@pinia/colada";
import type { TAddress } from "~/types/address";

export const useTruckRoute = defineQuery(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const route = useRoute();
  const query = useQuery<{
    truck: { id: number; number: string };
    addresses: TAddress[];
  }>({
    key: ["truck", "route", route.params.id as string],
    query: () => $fetch(apiBase + `/trucks/${route.params.id}/route`),
  });
  return { ...query };
});
