import { db } from '@/api';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { DocumentData, addDoc, collection } from 'firebase/firestore';

export interface IAddJobOfferInput {
  userId: string;
  link: string;

  title?: string;
  salary?: {
    grossPerMonthPermanent: number;
    netPerMonthB2B: number;
  };
  requirements?: {
    essentialSkills: string[];
    niceToHaves: string[];
  };
  techStack?: string[];
}

const postAddJobOffer = async (
  data: IAddJobOfferInput
): Promise<DocumentData> => {
  const { userId, title, link, salary, requirements, techStack } = data;

  const docRef = await addDoc(collection(db, 'users', data.userId, 'jobs'), {
    userId,
    title,
    link,
    techStack,
    salary: {
      grossPerMonthPermanent: salary?.grossPerMonthPermanent,
      netPerMonthB2B: salary?.netPerMonthB2B,
    },
    requirements: {
      essentialSkills: requirements?.essentialSkills,
      niceToHaves: requirements?.niceToHaves,
    },
    date: new Date(),
  });

  return docRef;
};

interface IMutationPostAddJobOfferArgs {
  options?: MutationOptions<DocumentData, Error, IAddJobOfferInput>;
}

export const useMutationPostAddJobOffer = (
  args?: IMutationPostAddJobOfferArgs
) => {
  const { options } = args ?? {};

  return useMutation<DocumentData, Error, IAddJobOfferInput>({
    mutationFn: (data: IAddJobOfferInput) => postAddJobOffer(data),
    ...options,
  });
};
