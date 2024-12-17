import { defineQuery, useQuery } from "@pinia/colada";
import type { TAddress } from "~/types/address";

export const useTruckAddresses = defineQuery(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const route = useRoute();
  const query = useQuery<TAddress[]>({
    key: ["truck", "addresses", route.params.id as string],
    query: () => $fetch(apiBase + `/trucks/${route.params.id}/addresses`),
  });
  return { ...query };
});
