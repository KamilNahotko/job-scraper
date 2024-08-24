import { useMutationDeleteJobOffer } from "@/api/queries/deleteJobOffer.query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

interface IJobListingActionsProps {
  userId: string;
  documentId: string;
}

export const JobListingActions = ({
  userId,
  documentId,
}: IJobListingActionsProps) => {
  const { mutate } = useMutationDeleteJobOffer();

  const handleDeleteJobOffer = () => {
    mutate({ documentId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex justify-center rounded-md border bg-white p-2 hover:bg-primary/90 dark:text-black">
          <EllipsisVertical />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-full">
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex items-center justify-between gap-1">
            <Pencil size={16} />
            <p className="font-medium">Edit</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleDeleteJobOffer}
        >
          <div className="flex items-center justify-between gap-1">
            <Trash2 size={16} />
            <p className="font-medium">Remove</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
