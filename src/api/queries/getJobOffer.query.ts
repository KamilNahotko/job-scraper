import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IJobOffer } from "@/types";
import { QueryOptions } from "../api.types";
import { useUser } from "@clerk/nextjs";

interface IGetJobOfferOptions {
  jobOfferId: string;
}

export const getJobOffer = async (
  options: IGetJobOfferOptions,
  userId: string,
): Promise<IJobOffer | null> => {
  const { jobOfferId } = options;

  const docRef = doc(db, "users", userId, "jobs", jobOfferId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  if (docSnap.exists()) {
    return data as IJobOffer;
  }

  return null;
};

interface IQueryGetJobOffergArgs {
  jobOfferId: string;
  options?: QueryOptions<IJobOffer | null>;
}

export const useQueryGetJobOffer = (args: IQueryGetJobOffergArgs) => {
  const { options, jobOfferId } = args;
  const { user } = useUser();

  return useQuery<IJobOffer | null, AxiosError>({
    queryKey: ["jobOffer", jobOfferId, user, user?.id],
    queryFn: () => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return getJobOffer({ jobOfferId }, user.id);
    },
    enabled: !!user,
    ...options,
  });
};
