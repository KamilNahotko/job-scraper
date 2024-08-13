import { Timestamp } from "firebase/firestore";

export interface IJobOffer {
  id: string;
  salary: ISalary;
  link: string;
  date: Timestamp;
  requirements: IRequirements;
  title: string;
  companyName: string;
  techStack: string[];
  experience?: string;
  operatingMode?: string;
  typeOfWork?: string;
  status: ApplicationStatus;
  description?: string;
}

export enum ApplicationStatus {
  IN_PROGRESS_INTERVIEW = "IN_PROGRESS_INTERVIEW",
  REJECTED_NO_INTERVIEW = "REJECTED_NO_INTERVIEW",
  REJECTED_AFTER_INTERVIEW = "REJECTED_AFTER_INTERVIEW",
  NO_RESPONSE = "NO_RESPONSE",
}

export interface ISalary {
  grossPerMonthPermanent: {
    min: number;
    max: number;
  };
  netPerMonthB2B: {
    min: number;
    max: number;
  };
}

export interface IRequirements {
  essentialSkills: string[];
  niceToHaves: string[];
}
