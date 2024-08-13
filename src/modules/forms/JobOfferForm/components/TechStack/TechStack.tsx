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

interface ITechStackProps {
  techStack?: IJobOffer["techStack"];
  handleOpenDialogTechStack: () => void;
}

export const TechStack = ({
  techStack,
  handleOpenDialogTechStack,
}: ITechStackProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tech Stack</CardTitle>
        <CardDescription>
          The listed technology stack in the job offer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[100px]">Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {techStack?.map((item) => (
              <TableRow key={item}>
                <TableCell className="font-semibold">{item}</TableCell>
                <TableCell className="font-semibold">-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={() => handleOpenDialogTechStack()}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add tech stack
        </Button>
      </CardFooter>
    </Card>
  );
};
