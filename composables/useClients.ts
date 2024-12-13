import { defineQuery, useQuery } from "@pinia/colada";
import type { TClient } from "~/types/client";

export const useClients = defineQuery(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const query = useQuery<TClient[]>({
    key: ["clients"],
    query: () => $fetch(apiBase + "/clients"),
  });
  return { ...query };
});
