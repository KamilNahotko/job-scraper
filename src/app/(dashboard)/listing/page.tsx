"use client";

import { Spinner } from "@/components/ui/spinner";
import { useAuthenticatedUser } from "@/hooks";
import { JobListing } from "@/modules";

const ListingPage = () => {
  const { userId, isLoading } = useAuthenticatedUser();

  if (isLoading || !userId)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner size="large" />
      </div>
    );

  return (
    <div className="mt-10">
      <JobListing userId={userId} isShowPagination />
    </div>
  );
};

export default ListingPage;
