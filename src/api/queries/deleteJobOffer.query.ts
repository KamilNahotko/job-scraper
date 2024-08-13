import { db } from "@/api";
import { useUser } from "@clerk/nextjs";
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

export interface IDeleteJobOfferInput {
  documentId: string;
}
const deleteJobOffer = async (
  data: IDeleteJobOfferInput,
  userId: string,
): Promise<void> => {
  const { documentId } = data;
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
  const { user } = useUser();

  return useMutation<void, Error, IDeleteJobOfferInput>({
    mutationFn: (data: IDeleteJobOfferInput) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return deleteJobOffer(data, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobListing"] });
    },
    ...options,
  });
};
