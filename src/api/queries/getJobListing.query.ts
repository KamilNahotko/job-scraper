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
  Timestamp,
  getCountFromServer,
} from "firebase/firestore";
import { jobListingLimit } from "@/consts";

export interface IJobListingData {
  id: string;
  salary: Salary;
  link: string;
  date: Timestamp;
  requirements: Requirements;
  title: string;
  companyName: string;
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
      total: number;
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
  total: number;
}> => {
  const {
    userId,
    limit = jobListingLimit,
    startAfterDoc,
    endBeforeDoc,
  } = options;

  const coll = collection(db, "users", userId, "jobs");

  let baseQuery = query(coll, orderBy("date", "desc"), firestoreLimit(limit));

  if (startAfterDoc) {
    baseQuery = query(
      baseQuery,
      startAfter(startAfterDoc),
      firestoreLimit(limit),
    );
  } else if (endBeforeDoc) {
    baseQuery = query(baseQuery, endBefore(endBeforeDoc), limitToLast(limit));
  }

  const [querySnapshot, countSnapshot] = await Promise.all([
    getDocs(baseQuery),
    getCountFromServer(coll),
  ]);

  const data = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  const firstVisible = querySnapshot.docs[0];
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return {
    jobOffers: data as IJobListingData[],
    firstVisible,
    lastVisible,
    total: countSnapshot.data().count,
  };
};

export const useQueryGetJobListing = (args: IQueryGetJobListingArgs) => {
  const { options, userId, limit, startAfterDoc, endBeforeDoc } = args;

  return useQuery<
    {
      jobOffers: IJobListingData[];
      firstVisible: DocumentSnapshot;
      lastVisible: DocumentSnapshot;
      total: number;
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
