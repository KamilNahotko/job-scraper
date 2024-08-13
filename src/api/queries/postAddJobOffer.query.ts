import { db } from "@/api";
import { ApplicationStatus, IJobOffer } from "@/types";
import { useUser } from "@clerk/nextjs";
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
} from "firebase/firestore";

export interface IAddJobOfferInput extends IJobOffer {
  link: string;
}

const postAddJobOffer = async (
  data: IAddJobOfferInput,
  userId: string,
): Promise<DocumentData> => {
  const {
    title,
    companyName,
    link,
    salary,
    requirements,
    techStack,
    experience,
    operatingMode,
    typeOfWork,
  } = data;

  const docRef = await addDoc(collection(db, "users", userId, "jobs"), {
    title,
    companyName,
    date: Timestamp.now(),
    status: ApplicationStatus.NO_RESPONSE,
    link,
    techStack,
    salary: {
      grossPerMonthPermanent: salary?.grossPerMonthPermanent,
      netPerMonthB2B: salary?.netPerMonthB2B,
    },
    experience: experience,
    operatingMode: operatingMode,
    typeOfWork: typeOfWork,
    requirements: {
      essentialSkills: requirements?.essentialSkills,
      niceToHaves: requirements?.niceToHaves,
    },
  });

  return docRef;
};

interface IMutationPostAddJobOfferArgs {
  options?: MutationOptions<DocumentData, Error, IAddJobOfferInput>;
}

export const useMutationPostAddJobOffer = (
  args?: IMutationPostAddJobOfferArgs,
) => {
  const { options } = args ?? {};
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation<DocumentData, Error, IAddJobOfferInput>({
    mutationFn: (data: IAddJobOfferInput) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return postAddJobOffer(data, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobListing"] });
    },
    ...options,
  });
};
