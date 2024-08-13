import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IJobOffer } from "@/types";
import { PlusCircle } from "lucide-react";

interface IRequirementsProps {
  requirements?: IJobOffer["requirements"];
  handleOpenDialogEssentialSkills: () => void;
  handleOpenDialogNiceToHaves: () => void;
}

export const Requirements = ({
  requirements,
  handleOpenDialogEssentialSkills,
  handleOpenDialogNiceToHaves,
}: IRequirementsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
        <CardDescription>
          The listed requirements in the job offer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Essential Skills</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirements?.essentialSkills.map((item) => (
              <TableRow key={item}>
                <TableCell className="font-semibold">{item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardFooter className="justify-center border-t p-4">
          <Button
            size="sm"
            variant="ghost"
            className="gap-1"
            onClick={handleOpenDialogEssentialSkills}
            type="button"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Essential Skills
          </Button>
        </CardFooter>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nice To Haves</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirements?.niceToHaves.map((item) => (
              <TableRow key={item}>
                <TableCell className="font-semibold">{item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={handleOpenDialogNiceToHaves}
          type="button"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add Nice To Haves
        </Button>
      </CardFooter>
    </Card>
  );
};
