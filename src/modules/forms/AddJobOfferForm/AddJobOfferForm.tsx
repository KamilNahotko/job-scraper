"use client";

import { useMutationPostAddJobOffer } from "@/api/queries/postAddJobOffer.query";
import { useMutationPostScrapJobOffer } from "@/api/queries/postScrapJobOffer.query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJobListingStore } from "@/store";
import { ClipboardPaste, FilePlus } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ScraperLoading } from "./components";

export const AddJobOfferForm = ({ userId }: { userId: string }) => {
  const { register, handleSubmit, setValue } = useForm<IAddJobOfferForm>();

  const { setIsAddingJobToListing, isAddingJobToListing } = useJobListingStore(
    (state) => ({
      setIsAddingJobToListing: state.setIsAddingJobToListing,
      isAddingJobToListing: state.isAddingJobToListing,
    }),
  );

  const {
    mutate: addJobOfferMutate,
    isError: isErrorAddJobOffer,
    isSuccess: isSuccessAddJobOffer,
  } = useMutationPostAddJobOffer({
    options: {
      onSettled: () => {
        setIsAddingJobToListing(false);
      },
    },
  });
  const {
    mutate: scrapJobOfferMutate,
    isError: isErrorScrapJobOffer,
    isSuccess: isSuccessScrapJobOffer,
  } = useMutationPostScrapJobOffer({
    options: {
      onMutate: () => {
        setIsAddingJobToListing(true);
      },
      onSuccess: (data, IScrapJobOfferInput) => {
        addJobOfferMutate({
          ...data,
          link: IScrapJobOfferInput.jobOfferUrl,
        });
      },
    },
  });

  const isError = isErrorAddJobOffer || isErrorScrapJobOffer;
  const isSuccess = isSuccessAddJobOffer && isSuccessScrapJobOffer;

  const onSubmit: SubmitHandler<IAddJobOfferForm> = async ({ jobOfferUrl }) => {
    scrapJobOfferMutate({
      jobOfferUrl,
    });
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setValue("jobOfferUrl", text);
    });
  };

  return (
    <>
      <Dialog
        open={isAddingJobToListing}
        onOpenChange={setIsAddingJobToListing}
      >
        <DialogContent
          className="max-w-[525px] p-2"
          isShowCloseButton={isError}
        >
          <ScraperLoading
            isSuccess={isSuccess}
            isLoading={isAddingJobToListing}
            isError={isError}
          />
        </DialogContent>
      </Dialog>

      <div className="relative overflow-hidden">
        <div className="container pb-28 pt-10">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Job Scrapper
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Start scraping the job offer page by pasting the URL below:
            </p>
            <div className="relative mx-auto mt-7 max-w-xl sm:mt-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative z-10 flex space-x-3 rounded-lg border bg-background p-3 shadow-lg">
                  <div className="flex-[1_0_0%]">
                    <Label htmlFor="jobOfferUrl" className="sr-only">
                      Scrap Job Offer
                    </Label>
                    <Input
                      disabled={isAddingJobToListing}
                      className="h-full"
                      id="jobOfferUrl"
                      placeholder="Scrap job offer"
                      {...register("jobOfferUrl")}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      size={"icon"}
                      disabled={isAddingJobToListing}
                    >
                      <FilePlus />
                    </Button>
                    <Button
                      type="button"
                      size={"icon"}
                      disabled={isAddingJobToListing}
                      onClick={handlePaste}
                    >
                      <ClipboardPaste />
                    </Button>
                  </div>
                </div>
              </form>
              <div className="absolute end-0 top-0 hidden -translate-y-12 translate-x-20 md:block">
                <svg
                  className="h-auto w-16 text-orange-500"
                  width={121}
                  height={135}
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="absolute bottom-0 start-0 hidden -translate-x-32 translate-y-10 md:block">
                <svg
                  className="h-auto w-40 text-cyan-500"
                  width={347}
                  height={188}
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth={7}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
