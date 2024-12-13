import { defineQuery, useQuery } from "@pinia/colada";
import type { TTruck } from "~/types/truck";

export const useTrucks = defineQuery(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const query = useQuery<TTruck[]>({
    key: ["trucks"],
    query: () => $fetch(apiBase + "/trucks"),
  });
  return { ...query };
});
