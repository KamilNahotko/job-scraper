import { ApplicationStatus } from "@/types";

export interface IJobOfferForm {
  title: string;
  link: string;
  companyName: string;
  operatingMode: string;
  experience: string;
  description: string;
  b2bMin: string;
  b2bMax: string;
  permanentMin: string;
  permanentMax: string;
  jobStatus: ApplicationStatus;
}
