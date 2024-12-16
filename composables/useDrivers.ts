import { defineQuery, useQuery } from "@pinia/colada";
import type { TDriver } from "~/types/driver";

export const useDrivers = defineQuery(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const query = useQuery<TDriver[]>({
    key: ["drivers"],
    query: () => $fetch(apiBase + `/drivers`),
  });
  return { ...query };
});
