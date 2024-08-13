"use client";

import { AddJobOfferForm, JobListing } from "@/modules";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/store";

const HomePage = () => {
  const userData = useUserStore((state) => state.userData);

  if (!userData)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner size="large" />
      </div>
    );

  return (
    <>
      <AddJobOfferForm userId={userData.user.uid} />
      <JobListing userId={userData.user.uid} />
    </>
  );
};

export default HomePage;
