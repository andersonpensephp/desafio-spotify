import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  maxVisiblePages?: number;
}

export const PaginationComponent = ({
  totalPages,
  page,
  setPage,
  maxVisiblePages = 5,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button disabled={page === 0}>
              <PaginationPrevious
                onClick={() => setPage(Math.max(0, page - 1))}
                isActive={page === 0}
              />
            </button>
          </PaginationItem>
          {Array.from({ length: Math.min(maxVisiblePages, totalPages) })
            .map((_, index) => {
              let pageIndex =
                Math.max(
                  0,
                  Math.min(totalPages - maxVisiblePages, Math.floor(page - maxVisiblePages / 2))
                ) + index;
              pageIndex = Math.min(pageIndex, totalPages - 1);
              return (
                <PaginationItem key={pageIndex}>
                  <PaginationLink className="cursor-pointer" onClick={() => setPage(pageIndex)} isActive={page === pageIndex}>
                    {pageIndex + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          <PaginationItem>
            <button disabled={page >= totalPages - 1}>
              <PaginationNext
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                isActive={page === totalPages - 1}
              />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
