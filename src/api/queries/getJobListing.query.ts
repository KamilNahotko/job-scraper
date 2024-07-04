import { QueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  limit as firestoreLimit,
  orderBy,
  query,
} from 'firebase/firestore';
import { jobListingLimit } from '@/consts';

interface IJobListingData {
  id: string;
  salary: Salary;
  link: string;
  date: string;
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
  limit?: number;
  options?: QueryOptions<IJobListingData[], AxiosError>;
}

interface IGetJobListingOptions {
  userId: string;
  limit?: number;
}

export const getJobListing = async (
  options: IGetJobListingOptions
): Promise<IJobListingData[]> => {
  const { userId, limit = jobListingLimit } = options;

  const querySnapshot = await getDocs(
    query(
      collection(db, 'users', userId, 'jobs'),
      orderBy('date', 'desc'),
      firestoreLimit(limit)
    )
  );
  const data = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return data as IJobListingData[];
};

export const useQueryGetJobListing = (args: IQueryGetJobListingArgs) => {
  const { options, userId, limit } = args;

  return useQuery<IJobListingData[], AxiosError>({
    queryKey: ['jobListing', userId, limit],
    queryFn: () => getJobListing({ userId, limit }),
    ...options,
  });
};
