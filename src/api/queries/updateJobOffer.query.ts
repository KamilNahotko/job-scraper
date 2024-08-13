import { db } from "@/api";
import { IJobOffer } from "@/types";
import { useUser } from "@clerk/nextjs";
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";

export interface IUpdateJobOfferInput {
  documentId: string;
  jobData: IJobOffer;
}

const updateJobOffer = async (
  data: IUpdateJobOfferInput,
  userId: string,
): Promise<void> => {
  const { documentId, jobData } = data;
  try {
    await updateDoc(doc(db, "users", userId, "jobs", documentId), {
      ...jobData,
    });
  } catch (error) {
    console.error("Error deleting job offer:", error);
    throw error;
  }
};

interface IMutationUpdateJobOfferArgs {
  options?: MutationOptions<void, Error, IUpdateJobOfferInput>;
}

export const useMutationUpdateJobOffer = (
  args?: IMutationUpdateJobOfferArgs,
) => {
  const { options } = args ?? {};
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation<void, Error, IUpdateJobOfferInput>({
    mutationFn: (data: IUpdateJobOfferInput) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return updateJobOffer(data, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobListing"] });
      queryClient.invalidateQueries({ queryKey: ["jobOffer"] });
    },
    ...options,
  });
};
