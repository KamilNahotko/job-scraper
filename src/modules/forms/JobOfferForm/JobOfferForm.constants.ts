import { z } from "zod";
import { IJobOfferForm } from "./JobOfferForm.types";
import { ApplicationStatus } from "@/types";

export const defaultValues: IJobOfferForm = {
  title: "",
  link: "",
  companyName: "",
  operatingMode: "",
  experience: "",
  description: "",
  b2bMin: "",
  b2bMax: "",
  permanentMin: "",
  permanentMax: "",
  jobStatus: ApplicationStatus.NO_RESPONSE,
};

const ApplicationStatusEnum = z.enum([
  "IN_PROGRESS_INTERVIEW",
  "REJECTED_NO_INTERVIEW",
  "NO_RESPONSE",
  "REJECTED_AFTER_INTERVIEW",
]);

export const validationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().min(1, "Link is required"),
  companyName: z.string().min(1, "Company name is required"),
  operatingMode: z.string().min(1, "Operating mode is required"),
  experience: z.string().min(1, "Experience is required"),
  description: z.string(),
  b2bMin: z.string().regex(/^\d*$/, "B2B Min must be a number"),
  b2bMax: z.string().regex(/^\d*$/, "B2B Max must be a number"),
  permanentMin: z.string().regex(/^\d*$/, "Permanent Min must be a number"),
  permanentMax: z.string().regex(/^\d*$/, "Permanent Max must be a number"),
  jobStatus: ApplicationStatusEnum,
});
