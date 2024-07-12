import { Header, SideNavigation } from "@/modules";
import { ReactQueryProvider } from "@/providers";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <div className="flex min-h-screen w-full flex-col">
        <SideNavigation />
        <div className="flex flex-grow flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          {children}
        </div>
      </div>
    </ReactQueryProvider>
  );
};

export default DashboardLayout;
