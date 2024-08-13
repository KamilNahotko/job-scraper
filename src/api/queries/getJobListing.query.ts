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
  getCountFromServer,
} from "firebase/firestore";
import { jobListingLimit } from "@/consts";
import { IJobOffer } from "@/types";
import { useUser } from "@clerk/nextjs";

interface IQueryGetJobListingArgs {
  limit?: number;
  startAfterDoc?: DocumentSnapshot;
  endBeforeDoc?: DocumentSnapshot;
  options?: QueryOptions<
    {
      jobOffers: IJobOffer[];
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
  jobOffers: IJobOffer[];
  firstVisible: DocumentSnapshot;
  lastVisible: DocumentSnapshot;
  total: number;
}> => {
  const {
    limit = jobListingLimit,
    startAfterDoc,
    endBeforeDoc,
    userId,
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
    jobOffers: data as IJobOffer[],
    firstVisible,
    lastVisible,
    total: countSnapshot.data().count,
  };
};

export const useQueryGetJobListing = (args: IQueryGetJobListingArgs) => {
  const { options, limit, startAfterDoc, endBeforeDoc } = args;
  const { user } = useUser();

  return useQuery<
    {
      jobOffers: IJobOffer[];
      firstVisible: DocumentSnapshot;
      lastVisible: DocumentSnapshot;
      total: number;
    },
    AxiosError
  >({
    queryKey: [
      "jobListing",
      limit,
      startAfterDoc,
      endBeforeDoc,
      startAfterDoc?.id,
      endBeforeDoc?.id,
      user,
      user?.id,
    ],
    queryFn: () => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return getJobListing({
        userId: user.id,
        limit,
        startAfterDoc,
        endBeforeDoc,
      });
    },
    enabled: !!user,
    ...options,
  });
};
