import { db } from "@/api";
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

export interface IDeleteJobOfferInput {
  documentId: string;
  userId: string;
}
const deleteJobOffer = async (data: IDeleteJobOfferInput): Promise<void> => {
  const { documentId, userId } = data;
  try {
    await deleteDoc(doc(db, "users", userId, "jobs", documentId));
  } catch (error) {
    console.error("Error deleting job offer:", error);
    throw error;
  }
};

interface IMutationPostAddJobOfferArgs {
  options?: MutationOptions<void, Error, IDeleteJobOfferInput>;
}

export const useMutationDeleteJobOffer = (
  args?: IMutationPostAddJobOfferArgs,
) => {
  const { options } = args ?? {};
  const queryClient = useQueryClient();

  return useMutation<void, Error, IDeleteJobOfferInput>({
    mutationFn: (data: IDeleteJobOfferInput) => deleteJobOffer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobListing"] });
    },
    ...options,
  });
};
