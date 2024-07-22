"use client";

import { AddJobOfferForm, JobListing } from "@/modules";
import { useAuthenticatedUser } from "@/hooks";
import { Spinner } from "@/components/ui/spinner";

const HomePage = () => {
  const { userId, isLoading } = useAuthenticatedUser();

  if (isLoading || !userId)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner size="large" />
      </div>
    );

  return (
    <>
      <AddJobOfferForm userId={userId} />
      <JobListing userId={userId} />
    </>
  );
};

export default HomePage;
