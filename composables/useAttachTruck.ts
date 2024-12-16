export const useAttachTruck = defineMutation(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const mutation = useMutation({
    mutation: ({
      target,
      targetId,
      truckId,
    }: {
      target: "address" | "driver";
      targetId: number;
      truckId: number;
    }) => {
      switch (target) {
        case "address":
          return $fetch(apiBase + `/addresses/${targetId}/truck/${truckId}`, {
            method: "POST",
          });
        case "driver":
          return $fetch(apiBase + `/drivers/${targetId}/truck/${truckId}`, {
            method: "PATCH",
          });
      }
    },
  });

  return mutation;
});
