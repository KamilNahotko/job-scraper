"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { rows } from "./Pagination.consts";

interface IPaginationProps {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  setRowsPerPage: (value: string) => void;
  rowsPerPage: string;
  total: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

export const Pagination = ({
  handlePrevPage,
  handleNextPage,
  rowsPerPage,
  setRowsPerPage,
  total,
  currentPage,
  setCurrentPage,
}: IPaginationProps) => {
  const [open, setOpen] = useState(false);

  const totalPages = Math.ceil(total / Number(rowsPerPage));

  const isDisabledPrevPage = currentPage === 1;
  const isDisabledNextPage =
    total / currentPage < Number(rowsPerPage) ? true : false;

  return (
    <div className="flex items-center justify-end gap-4 px-6">
      <div className="hidden items-center gap-4 sm:flex">
        <p className="text-sm font-medium">Rows per page</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[70px] justify-between"
              size="sm"
            >
              {rowsPerPage
                ? rows.find((row) => row.value === rowsPerPage)?.label
                : "Select row..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {rows.map((row) => (
                    <CommandItem
                      key={row.value}
                      value={row.value}
                      onSelect={(currentValue) => {
                        setRowsPerPage(
                          currentValue === rowsPerPage ? "5" : currentValue,
                        );
                        setCurrentPage(1);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          rowsPerPage === row.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {row.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <p className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </p>
      <Button
        variant="outline"
        onClick={handlePrevPage}
        disabled={isDisabledPrevPage}
        size="sm"
      >
        <ChevronLeft size={16} />
      </Button>
      <Button
        variant="outline"
        onClick={handleNextPage}
        disabled={isDisabledNextPage}
        size="sm"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};
