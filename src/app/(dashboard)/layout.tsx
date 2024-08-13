"use client";

import { Spinner } from "@/components/ui/spinner";
import { useFirebaseAuth } from "@/hooks";
import { Header, SideNavigation } from "@/modules";
import { ReactQueryProvider } from "@/providers";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = useFirebaseAuth();

  if (isLoading || isError)
    return (
      <div className="flex h-screen flex-grow items-center justify-center">
        <Spinner size="large" />
      </div>
    );

  return (
    <ReactQueryProvider>
      <div className="flex min-h-screen w-full flex-col">
        <SideNavigation />
        <div className="flex flex-grow flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <main className="container mx-auto w-full p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ReactQueryProvider>
  );
};

export default DashboardLayout;
