interface TodoPaginationProps {
  page: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

export default function TodoPagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: TodoPaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        id="pagination-prev"
        onClick={onPrevious}
        disabled={page === 1}
        className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <button
        id="pagination-next"
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}