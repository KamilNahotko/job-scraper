import { QueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface IJobListingData {
  id: string;
  salary: Salary;
  link: string;
  date: Date;
  requirements: Requirements;
  title: string;
  techStack: string[];
  experience?: string;
  operatingMode?: string;
  typeOfWork?: string;
}

export type Salary = {
  grossPerMonthPermanent: {
    min: number;
    max: number;
  };
  netPerMonthB2B: {
    min: number;
    max: number;
  };
};

export type Requirements = {
  essentialSkills: string[];
  niceToHaves: string[];
};

interface IQueryGetJobListingArgs {
  userId: string;
  options?: QueryOptions<IJobListingData[], AxiosError>;
}

export const getJobListing = async (
  userId: string
): Promise<IJobListingData[]> => {
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'jobs'));
  const data = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return data as IJobListingData[];
};

export const useQueryGetJobListing = (args: IQueryGetJobListingArgs) => {
  const { options, userId } = args;

  return useQuery<IJobListingData[], AxiosError>({
    queryKey: ['jobListing', userId],
    queryFn: () => getJobListing(userId),
    ...options,
  });
};
