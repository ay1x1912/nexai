import { Button } from "@/components/ui/button";
import React from "react";
interface DataPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function DataPagination({
  page,
  totalPages,
  onPageChange,
}: DataPaginationProps) {
  return (
    <div className="text-muted-foreground flex items-center justify-between p-4">
      <span className="">
        page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          variant={"ghost"}
        >
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || totalPages===0}
          variant={"ghost"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
