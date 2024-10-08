"use client";

import Link from "next/link";
import { Home, LineChart, BriefcaseBusiness, CalendarDays } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { APP_URL } from "@/consts";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./components";

export const SideNavigation = () => {
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const baseClasses =
      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8";
    const activeClasses = "bg-accent text-accent-foreground";
    const inactiveClasses = "text-muted-foreground";

    return `${baseClasses} ${pathname === href ? activeClasses : inactiveClasses}`;
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={APP_URL.home}
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <Home className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={APP_URL.jobListing}
                className={getLinkClassName(APP_URL.jobListing)}
              >
                <BriefcaseBusiness className="h-5 w-5" />
                <span className="sr-only">Job listing</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Job listing</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={APP_URL.calendar}
                className={getLinkClassName(APP_URL.calendar)}
              >
                <CalendarDays className="h-5 w-5" />
                <span className="sr-only">Calendar</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Calendar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={APP_URL.analytics}
                className={getLinkClassName(APP_URL.analytics)}
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ModeToggle />
      </nav>
    </aside>
  );
};
