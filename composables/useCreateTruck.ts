import type { TTruck } from "~/types/truck";

export const useCreateTuck = defineMutation(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const mutation = useMutation({
    mutation: (truckData: Partial<TTruck>) =>
      $fetch(apiBase + "/trucks", {
        method: "POST",
        body: JSON.stringify(truckData),
      }),
  });

  return mutation;
});
