import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IAddNewJobSkill } from "../../hooks";
import { ChangeEvent, useState } from "react";

export const DialogForm = ({
  isOpen,
  setIsOpen,
  addNewJobSkill,
  dialogTitle,
  dialogDescription,
  type,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  addNewJobSkill: (value: IAddNewJobSkill) => void;
  dialogTitle: string;
  dialogDescription: string;
  type: "essentialSkill" | "niceToHave" | "techStack";
}) => {
  const [value, setValue] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleAddTechStack = () => {
    setIsOpen(false);
    addNewJobSkill({ type, item: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder="Type here"
              value={value}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <Button className="px-3" type="button" onClick={handleAddTechStack}>
            Add
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
