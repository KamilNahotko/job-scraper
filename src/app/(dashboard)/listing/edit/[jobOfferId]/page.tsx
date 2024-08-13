"use client";

import { useQueryGetJobOffer } from "@/api/queries/getJobOffer.query";
import { useMutationUpdateJobOffer } from "@/api/queries/updateJobOffer.query";
import { Spinner } from "@/components/ui/spinner";
import { APP_URL } from "@/consts";
import { JobOfferForm } from "@/modules/forms";
import { IJobOffer } from "@/types";
import { useRouter } from "next/navigation";

const SingleJobOfferPage = ({
  params: { jobOfferId },
}: {
  params: { jobOfferId: string };
}) => {
  const router = useRouter();
  const { data, isLoading } = useQueryGetJobOffer({ jobOfferId });
  const { mutate } = useMutationUpdateJobOffer();

  const handleOnSubmit = (jobData: IJobOffer) => {
    mutate(
      { documentId: jobOfferId, jobData },
      {
        onSuccess: () => {
          router.push(APP_URL.jobListing);
        },
      },
    );
  };

  if (isLoading || !data)
    return (
      <div className="flex h-screen flex-grow items-center justify-center">
        <Spinner size="large" />
      </div>
    );

  return (
    <JobOfferForm
      data={data}
      jobOfferId={jobOfferId}
      onSubmit={(data) => handleOnSubmit(data)}
    />
  );
};

export default SingleJobOfferPage;
