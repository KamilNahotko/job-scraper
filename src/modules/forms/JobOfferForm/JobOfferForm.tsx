"use client";

import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { IJobOfferForm } from "./JobOfferForm.types";
import { ApplicationStatus, IJobOffer } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, validationSchema } from "./JobOfferForm.constants";
import {
  formatDataToDefaultValues,
  getStatusLabel,
} from "./JobOfferForm.utils";
import { JobDetails, Requirements, TechStack } from "./components";
import { useDialog } from "@/hooks";
import { useJobSkillsState } from "./hooks";
import { DialogForm } from "./components/DialogForm/DialogForm";

interface IJobOfferFormProps {
  data: IJobOffer;
  jobOfferId: string;
  onSubmit: (data: IJobOffer) => void;
}

export const JobOfferForm = ({
  jobOfferId,
  data,
  onSubmit,
}: IJobOfferFormProps) => {
  const router = useRouter();

  const methods = useForm<IJobOfferForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: data ? formatDataToDefaultValues(data) : defaultValues,
  });

  const { handleSubmit, control } = methods;

  const { essentialSkills, niceToHaves, techStack, addNewJobSkill } =
    useJobSkillsState(data);

  const handleOnSubmit = (formData: IJobOfferForm) => {
    const formatedFormData = {
      id: jobOfferId,
      description: formData.description,
      link: formData.link,
      date: data.date,
      requirements: {
        essentialSkills: essentialSkills,
        niceToHaves: niceToHaves,
      },
      title: formData.title,
      companyName: formData.companyName,
      techStack: techStack,
      experience: formData.experience,
      operatingMode: formData.operatingMode,
      typeOfWork: data?.typeOfWork || "",
      status: formData.jobStatus,
      salary: {
        grossPerMonthPermanent: {
          min: Number(formData.permanentMin),
          max: Number(formData.permanentMax),
        },
        netPerMonthB2B: {
          min: Number(formData.b2bMin),
          max: Number(formData.b2bMax),
        },
      },
    };

    onSubmit(formatedFormData);
  };

  const {
    isOpenDialog: isOpenDialogEssentialSkills,
    setIsOpenDialog: setIsOpenDialogEssentialSkills,
    handleOpenDialog: handleOpenDialogEssentialSkills,
  } = useDialog();
  const {
    isOpenDialog: isOpenDialogNiceToHaves,
    setIsOpenDialog: setIsOpenDialogNiceToHaves,
    handleOpenDialog: handleOpenDialogNiceToHaves,
  } = useDialog();
  const {
    isOpenDialog: isOpenDialogTechStack,
    setIsOpenDialog: setIsOpenDialogTechStack,
    handleOpenDialog: handleOpenDialogTechStack,
  } = useDialog();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogForm
          setIsOpen={setIsOpenDialogNiceToHaves}
          isOpen={isOpenDialogNiceToHaves}
          addNewJobSkill={addNewJobSkill}
          dialogTitle="Add new nice to have"
          dialogDescription="Enter the name of nice to have"
          type="niceToHave"
        />
        <DialogForm
          setIsOpen={setIsOpenDialogEssentialSkills}
          isOpen={isOpenDialogEssentialSkills}
          addNewJobSkill={addNewJobSkill}
          dialogTitle="Add new essential skill"
          dialogDescription="Enter the name of the essential skill"
          type="essentialSkill"
        />
        <DialogForm
          setIsOpen={setIsOpenDialogTechStack}
          isOpen={isOpenDialogTechStack}
          addNewJobSkill={addNewJobSkill}
          dialogTitle="Add new technology"
          dialogDescription="Enter the name of the technology below"
          type="techStack"
        />
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {data?.title || "Job Title"}
            </h1>
            <Badge variant="outline" className="ml-auto sm:ml-0">
              {data?.status || "No Response"}
            </Badge>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button type="submit" size="sm">
                Save
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <JobDetails />
              <TechStack
                handleOpenDialogTechStack={handleOpenDialogTechStack}
                techStack={techStack}
              />
              <Requirements
                requirements={{
                  essentialSkills,
                  niceToHaves,
                }}
                handleOpenDialogNiceToHaves={handleOpenDialogNiceToHaves}
                handleOpenDialogEssentialSkills={
                  handleOpenDialogEssentialSkills
                }
              />
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Job Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="jobStatus">Status</Label>
                      <Controller
                        name="jobStatus"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              id="jobStatus"
                              aria-label="Select status"
                            >
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(ApplicationStatus).map(
                                (status) => (
                                  <SelectItem key={status} value={status}>
                                    {getStatusLabel(status)}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-07-chunk-5">
                <CardHeader>
                  <CardTitle>Salary</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground">B2B:</p>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="b2bMin">min</Label>
                        <Controller
                          name="b2bMin"
                          control={control}
                          render={({ field }) => (
                            <Input {...field} id="b2bMin" type="number" />
                          )}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="b2bMax">max</Label>
                        <Controller
                          name="b2bMax"
                          control={control}
                          render={({ field }) => (
                            <Input {...field} id="b2bMax" type="number" />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground">Permanent:</p>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="permanentMin">min</Label>
                        <Controller
                          name="permanentMin"
                          control={control}
                          render={({ field }) => (
                            <Input {...field} id="permanentMin" type="number" />
                          )}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="permanentMax">max</Label>
                        <Controller
                          name="permanentMax"
                          control={control}
                          render={({ field }) => (
                            <Input {...field} id="permanentMax" type="number" />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
