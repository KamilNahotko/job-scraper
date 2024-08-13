import { IJobOffer } from "@/types";
import { MutationOptions, useMutation } from "@tanstack/react-query";

import axios, { AxiosError } from "axios";

export interface IScrapJobOfferInput {
  jobOfferUrl: string;
}

const postScrapJobOffer = async (data: IScrapJobOfferInput) => {
  const { jobOfferUrl } = data;

  const response = await axios.post<IJobOffer>("/api/extractJobInfo", {
    url: jobOfferUrl,
  });

  return response.data;
};

interface IMutationPostScrapJobOfferArgs {
  options?: MutationOptions<IJobOffer, AxiosError, IScrapJobOfferInput>;
}

export const useMutationPostScrapJobOffer = (
  args?: IMutationPostScrapJobOfferArgs,
) => {
  const { options } = args ?? {};

  return useMutation<IJobOffer, AxiosError, IScrapJobOfferInput>({
    mutationFn: (input: IScrapJobOfferInput) => postScrapJobOffer(input),
    ...options,
  });
};
