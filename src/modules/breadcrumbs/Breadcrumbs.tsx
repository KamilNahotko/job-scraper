"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const APP_URL = {
  home: "/",
  jobListing: "/listing",
  calendar: "/calendar",
};

const pathMap: { [key: string]: string } = {
  [APP_URL.home]: "Dashboard",
  [APP_URL.jobListing]: "Job Listing",
  [APP_URL.calendar]: "Calendar",
};

export const Breadcrumbs = () => {
  const pathname = usePathname();

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathname === APP_URL.home ? (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={APP_URL.home}>Dashboard</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {pathname !== APP_URL.home && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {pathMap[pathname] || pathname.slice(1)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
