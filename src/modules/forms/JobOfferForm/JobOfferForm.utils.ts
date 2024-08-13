import { ApplicationStatus, IJobOffer } from "@/types";
import { IJobOfferForm } from "./JobOfferForm.types";

export const getStatusLabel = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.IN_PROGRESS_INTERVIEW:
      return "In Progress";
    case ApplicationStatus.REJECTED_NO_INTERVIEW:
      return "Rejected (No Interview)";
    case ApplicationStatus.REJECTED_AFTER_INTERVIEW:
      return "Rejected (After Interview)";
    case ApplicationStatus.NO_RESPONSE:
      return "No Response";
    default:
      return status;
  }
};

export const formatDataToDefaultValues = (data: IJobOffer): IJobOfferForm => ({
  title: data.title,
  link: data.link,
  companyName: data.companyName,
  operatingMode: data.operatingMode || "",
  experience: data.experience || "",
  description: data.description || "",
  b2bMin: String(data.salary.netPerMonthB2B.min),
  b2bMax: String(data.salary.netPerMonthB2B.max),
  permanentMin: String(data.salary.grossPerMonthPermanent.min),
  permanentMax: String(data.salary.grossPerMonthPermanent.max),
  jobStatus: data.status || ApplicationStatus.NO_RESPONSE,
});
