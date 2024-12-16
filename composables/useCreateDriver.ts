import type { TDriver } from "~/types/driver";

export const useCreateDriver = defineMutation(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const mutation = useMutation({
    mutation: (driverData: Partial<TDriver>) =>
      $fetch(apiBase + "/drivers", {
        method: "POST",
        body: JSON.stringify(driverData),
      }),
  });

  return mutation;
});
