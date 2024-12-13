export const useAttachTruck = defineMutation(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const mutation = useMutation({
    mutation: ({
      addressId,
      truckId,
    }: {
      addressId: number;
      truckId: number;
    }) =>
      $fetch(apiBase + `/addresses/${addressId}/truck/${truckId}`, {
        method: "POST",
      }),
  });

  return mutation;
});
