import { defineMutation, useMutation } from "@pinia/colada";

export const useChangePriority = defineMutation(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const mutation = useMutation({
    mutation: (payload: { addressId: number; priority: number }) =>
      $fetch(
        apiBase +
          `/addresses/${payload.addressId}/priority/${payload.priority}`,
        {
          method: "PUT",
        }
      ),
  });

  return mutation;
});
