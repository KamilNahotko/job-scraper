import { MutationOptions, useMutation } from "@tanstack/react-query";

import axios, { AxiosError } from "axios";

export interface IScrapJobOfferInput {
  jobOfferUrl: string;
}

interface IScrapJobOfferData {
  title?: string;
  companyName?: string;
  experience?: string;
  operatingMode?: string;
  typeOfWork?: string;
  salary?: {
    grossPerMonthPermanent: {
      min: number;
      max: number;
    };
    netPerMonthB2B: {
      min: number;
      max: number;
    };
  };
  requirements?: {
    essentialSkills: string[];
    niceToHaves: string[];
  };
  techStack?: string[];
}

const postScrapJobOffer = async (data: IScrapJobOfferInput) => {
  const { jobOfferUrl } = data;

  const response = await axios.post<IScrapJobOfferData>("/api/extractJobInfo", {
    url: jobOfferUrl,
  });

  return response.data;
};

interface IMutationPostScrapJobOfferArgs {
  options?: MutationOptions<
    IScrapJobOfferData,
    AxiosError,
    IScrapJobOfferInput
  >;
}

export const useMutationPostScrapJobOffer = (
  args?: IMutationPostScrapJobOfferArgs,
) => {
  const { options } = args ?? {};

  return useMutation<IScrapJobOfferData, AxiosError, IScrapJobOfferInput>({
    mutationFn: (input: IScrapJobOfferInput) => postScrapJobOffer(input),
    ...options,
  });
};
