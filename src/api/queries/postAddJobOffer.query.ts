import { db } from "@/api";
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { DocumentData, addDoc, collection } from "firebase/firestore";

export interface IAddJobOfferInput {
  userId: string;
  link: string;
  title?: string;
  companyName?: string;
  experience?: string;
  operatingMode?: string;
  typeOfWork?: string;
  salary?: {
    grossPerMonthPermanent: {
      min: number;
      max: number;
    };
    netPerMonthB2B: {
      min: number;
      max: number;
    };
  };
  requirements?: {
    essentialSkills: string[];
    niceToHaves: string[];
  };
  techStack?: string[];
}

const postAddJobOffer = async (
  data: IAddJobOfferInput,
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

  const docRef = await addDoc(collection(db, "users", data.userId, "jobs"), {
    title,
    companyName,
    date: dayjs().format("DD.MM.YYYY"),
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

  return useMutation<DocumentData, Error, IAddJobOfferInput>({
    mutationFn: (data: IAddJobOfferInput) => postAddJobOffer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobListing"] });
    },
    ...options,
  });
};
