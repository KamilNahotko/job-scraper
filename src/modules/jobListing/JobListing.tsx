"use client";

import { useQueryGetJobListing } from "@/api/queries/getJobListing.query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useJobListingStore } from "@/store";
import { JobListingSkeletonRow } from "./components";
import { APP_URL, jobListingLimit } from "@/consts";
import { useState } from "react";
import { DocumentSnapshot } from "firebase/firestore";
import { Pagination } from "./components/pagination";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";

export const JobListing = ({
  userId,
  isShowPagination = false,
}: {
  userId: string;
  isShowPagination?: boolean;
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === APP_URL.home;

  const [firstDoc, setFirstDoc] = useState<DocumentSnapshot>();
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot>();
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 5;

  const { data: jobListingData, isLoading: isLoadingJobListing } =
    useQueryGetJobListing({
      userId,
      limit: limitPerPage,
      startAfterDoc: lastDoc,
      endBeforeDoc: firstDoc,
    });

  const isAddingJobToListing = useJobListingStore(
    (state) => state.isAddingJobToListing,
  );

  const handleNextPage = () => {
    if (jobListingData?.lastVisible) {
      setLastDoc(jobListingData.lastVisible);
      setFirstDoc(undefined);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (jobListingData?.firstVisible) {
      setFirstDoc(jobListingData.firstVisible);
      setLastDoc(undefined);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const isDisabledPrevPage = currentPage === 1;
  const isDisabledNextPage = jobListingData
    ? jobListingData.jobOffers.length < limitPerPage
    : true;

  const isJobOffers = jobListingData && jobListingData.jobOffers.length > 0;

  if (!isJobOffers)
    return isHomePage ? null : (
      <h1 className="mt-10 text-center">
        You have not added any job offer.<br></br> Go back to{" "}
        <Link className="underline" href={APP_URL.home}>
          the home page
        </Link>{" "}
        to add some.
      </h1>
    );

  return (
    <div className="flex flex-col gap-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Job Offers</CardTitle>
          <CardDescription>Recent added job offers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead className="hidden sm:table-cell">Salary</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Experience
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Date Added
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingJobListing || isAddingJobToListing
                ? [...Array(jobListingLimit)].map((_, i) => (
                    <JobListingSkeletonRow key={i} />
                  ))
                : jobListingData?.jobOffers?.map((job) => {
                    const salaryPermanent = job.salary.grossPerMonthPermanent;
                    const salaryB2B = job.salary.netPerMonthB2B;
                    const dateString = dayjs(job.date.toDate()).format(
                      "DD.MM.YYYY",
                    );

                    return (
                      <TableRow key={job.id} className="bg-accent">
                        <TableCell>
                          <div className="font-medium">{job.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{job.companyName}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div>
                            {`${salaryPermanent.min}-${salaryPermanent.max}`} /
                            Permanent
                          </div>
                          <div>
                            {" "}
                            {`${salaryB2B.min}-${salaryB2B.max}`} / B2B
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            {job.experience}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {dateString}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isShowPagination && (
        <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          isDisabledPrevPage={isDisabledPrevPage}
          isDisabledNextPage={isDisabledNextPage}
        />
      )}
    </div>
  );
};
