import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Bot, CircleX } from "lucide-react";

interface IScraperLoadingProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const ScraperLoading = ({
  isLoading,
  isError,
  isSuccess,
}: IScraperLoadingProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 90) {
            return oldProgress;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 90);
        });
      }, 700);
    } else {
      setProgress(100);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-4 dark:bg-gray-950">
      <div className="py-3">
        {isError ? (
          <div>
            <CircleX size={28} color="#cc0000" />
          </div>
        ) : (
          <div className="animate-bounce">
            <Bot size={28} />
          </div>
        )}
      </div>
      <div className="mb-4 text-2xl dark:text-white">
        {isLoading && "Scraping page is progress"}
        {isSuccess && "Scraping completed!"}
        {isError && "Something went wrong. Try again."}
      </div>

      {!isError && (
        <>
          <div className="w-64 sm:w-96">
            <Progress value={progress} className="w-full" />
          </div>
          <div className="mt-2">{Math.round(progress)}%</div>
        </>
      )}
    </div>
  );
};
