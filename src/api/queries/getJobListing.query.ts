import { QueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  limit as firestoreLimit,
  orderBy,
  query,
  startAfter,
  endBefore,
  DocumentSnapshot,
  limitToLast,
} from "firebase/firestore";
import { jobListingLimit } from "@/consts";

export interface IJobListingData {
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
  startAfterDoc?: DocumentSnapshot;
  endBeforeDoc?: DocumentSnapshot;
  options?: QueryOptions<
    {
      jobOffers: IJobListingData[];
      firstVisible: DocumentSnapshot;
      lastVisible: DocumentSnapshot;
    },
    AxiosError
  >;
}

interface IGetJobListingOptions {
  userId: string;
  limit?: number;
  startAfterDoc?: DocumentSnapshot;
  endBeforeDoc?: DocumentSnapshot;
}

export const getJobListing = async (
  options: IGetJobListingOptions,
): Promise<{
  jobOffers: IJobListingData[];
  firstVisible: DocumentSnapshot;
  lastVisible: DocumentSnapshot;
}> => {
  const {
    userId,
    limit = jobListingLimit,
    startAfterDoc,
    endBeforeDoc,
  } = options;

  let baseQuery = query(
    collection(db, "users", userId, "jobs"),
    orderBy("date", "desc"),
    firestoreLimit(limit),
  );

  if (startAfterDoc) {
    baseQuery = query(
      baseQuery,
      startAfter(startAfterDoc),
      firestoreLimit(limit),
    );
  } else if (endBeforeDoc) {
    baseQuery = query(baseQuery, endBefore(endBeforeDoc), limitToLast(limit));
  }

  const querySnapshot = await getDocs(baseQuery);

  const data = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  const firstVisible = querySnapshot.docs[0];
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { jobOffers: data as IJobListingData[], firstVisible, lastVisible };
};

export const useQueryGetJobListing = (args: IQueryGetJobListingArgs) => {
  const { options, userId, limit, startAfterDoc, endBeforeDoc } = args;

  return useQuery<
    {
      jobOffers: IJobListingData[];
      firstVisible: DocumentSnapshot;
      lastVisible: DocumentSnapshot;
    },
    AxiosError
  >({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      "jobListing",
      userId,
      limit,
      startAfterDoc?.id,
      endBeforeDoc?.id,
    ],
    queryFn: () =>
      getJobListing({ userId, limit, startAfterDoc, endBeforeDoc }),
    ...options,
  });
};
