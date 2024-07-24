import { useMutationDeleteJobOffer } from "@/api/queries/deleteJobOffer.query";
import { Button } from "@/components/ui/button";
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
    mutate({ userId, documentId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="sm">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-full">
        <DropdownMenuItem>
          <div className="flex items-center justify-between gap-1">
            <Pencil size={16} />
            <p className="font-medium">Edit</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteJobOffer}>
          <div className="flex items-center justify-between gap-1">
            <Trash2 size={16} />
            <p className="font-medium">Remove</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
