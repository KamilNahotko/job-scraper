import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationProps {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  isDisabledPrevPage: boolean;
  isDisabledNextPage: boolean;
}

export const Pagination = ({
  handlePrevPage,
  handleNextPage,
  isDisabledPrevPage,
  isDisabledNextPage,
}: IPaginationProps) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        variant="ghost"
        onClick={handlePrevPage}
        disabled={isDisabledPrevPage}
        size="sm"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>
      <Button
        onClick={handleNextPage}
        disabled={isDisabledNextPage}
        variant="ghost"
        size="sm"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};
