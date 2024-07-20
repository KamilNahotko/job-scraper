"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, UserButton } from "@clerk/nextjs";
import {
  BriefcaseBusiness,
  CalendarDays,
  Home,
  LineChart,
  PanelLeft,
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { APP_URL } from "@/consts";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const baseClasses = "flex items-center gap-4 px-2.5";
    const activeClasses = "text-foreground";
    const inactiveClasses = "text-muted-foreground hover:text-foreground";

    return `${baseClasses} ${pathname === href ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="mt-6 grid gap-6 text-lg font-medium">
            <Link
              href={APP_URL.home}
              className={getLinkClassName(APP_URL.home)}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href={APP_URL.jobListing}
              className={getLinkClassName(APP_URL.jobListing)}
            >
              <BriefcaseBusiness className="h-5 w-5" />
              Job listing
            </Link>
            <Link
              href={APP_URL.calendar}
              className={getLinkClassName(APP_URL.calendar)}
            >
              <CalendarDays className="h-5 w-5" />
              Calendar
            </Link>
            <Link
              href={APP_URL.analytics}
              className={getLinkClassName(APP_URL.analytics)}
            >
              <LineChart className="h-5 w-5" />
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumbs />
      <div className="ml-auto flex-1 grow-0">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};
