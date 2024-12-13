import { defineQuery, useQuery } from "@pinia/colada";
import type { TAddress } from "~/types/address";

export const useClient = defineQuery(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const route = useRoute();
  const query = useQuery<{ name: string; addresses: TAddress[] }>({
    key: ["clients", route.params.id as string],
    query: () => $fetch(apiBase + `/clients/${route.params.id}`),
  });
  return { ...query };
});
