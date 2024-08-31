"use client";

import { Spinner } from "@/components/ui/spinner";
import { JobListing } from "@/modules";
import { useUserStore } from "@/store";

const ListingPage = () => {
  const userData = useUserStore((state) => state.userData);

  if (!userData)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner size="large" />
      </div>
    );

  return (
    <div className="mt-10">
      <JobListing
        userId={userData.user.uid}
        isShowPagination
        defaultRowsPerPage="10"
      />
    </div>
  );
};

export default ListingPage;
