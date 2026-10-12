import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

export function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  className = "",
}: AdminPaginationProps) {
  if (totalItems === 0) return null;

  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border/40 text-xs text-muted-foreground ${className}`}
    >
      <div className="flex items-center gap-2">
        <span>
          Hiển thị <strong className="text-foreground font-mono">{startItem}</strong> -{" "}
          <strong className="text-foreground font-mono">{endItem}</strong> trong{" "}
          <strong className="text-foreground font-mono">{totalItems}</strong> kết quả
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-2 border-l border-border/60 pl-2">
            <span>Dòng/trang:</span>
            <select
              value={pageSize}
              aria-label="Số dòng mỗi trang"
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 px-2 rounded-md bg-muted/60 border border-border/60 text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          className="h-8 w-8 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] border-border/60 text-muted-foreground hover:text-foreground"
          title="Trang đầu"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-8 w-8 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] border-border/60 text-muted-foreground hover:text-foreground"
          title="Trang trước"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="px-3 py-1 font-mono font-bold text-foreground bg-muted/50 rounded-md border border-border/40 select-none">
          {currentPage} / {Math.max(1, totalPages)}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-8 w-8 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] border-border/60 text-muted-foreground hover:text-foreground"
          title="Trang sau"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="h-8 w-8 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] border-border/60 text-muted-foreground hover:text-foreground"
          title="Trang cuối"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
