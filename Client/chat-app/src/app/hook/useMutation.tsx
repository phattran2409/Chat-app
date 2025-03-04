import { useMutation } from "convex/react";
import { useState } from "react";

export const useMutationState = (mutationToRun: any) => {
  const [pending, setpending] = useState(false);
  const mutation = useMutation(mutationToRun);

  const mutate = (payload: any) => {
    setpending(true);
    return mutation(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setpending(false));
  };
  return { mutate, pending };
};
