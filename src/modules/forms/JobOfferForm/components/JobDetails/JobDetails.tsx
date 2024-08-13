"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";

export const JobDetails = () => {
  const { control } = useFormContext();

  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <CardDescription>Highlights of the offer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">Job Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input {...field} id="title" type="text" className="w-full" />
              )}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="companyName">Company Name</Label>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="companyName"
                  type="text"
                  className="w-full"
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="operatingMode">Operating Mode</Label>
              <Controller
                name="operatingMode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="operatingMode"
                    type="text"
                    className="w-full"
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="experience"
                    type="text"
                    className="w-full"
                  />
                )}
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea {...field} id="description" className="min-h-32" />
              )}
            />
          </div>

          <div>
            <Label htmlFor="link">Job link</Label>
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <Input {...field} id="link" type="text" className="w-full" />
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
