import { db } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DocumentData, addDoc, collection } from 'firebase/firestore';

export interface addJobOfferInput {
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

const addJobOffer = async (data: addJobOfferInput): Promise<DocumentData> => {
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

export const useAddJobOfferQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: addJobOfferInput) => addJobOffer(data),
    onSuccess: () => {
      queryClient.setQueryData(['jobOffers'], () => {
        return [];
      });
    },
  });
};
