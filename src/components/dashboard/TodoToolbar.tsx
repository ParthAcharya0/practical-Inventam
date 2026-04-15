interface TodoToolbarProps {
  filterMine: boolean
  total: number
  loading: boolean
  onToggleFilter: () => void
}

export default function TodoToolbar({
  filterMine,
  total,
  loading,
  onToggleFilter,
}: TodoToolbarProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
        {filterMine ? "Mine" : "Everyone"}
        {!loading && (
          <span className="ml-2 text-xs font-normal text-muted-foreground/70">
            ({total})
          </span>
        )}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Everyone</span>
        <button
          id="filter-toggle"
          onClick={onToggleFilter}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            filterMine ? "bg-primary" : "bg-muted"
          }`}
          role="switch"
          aria-checked={filterMine}
          aria-label="Toggle between everyone and mine"
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              filterMine ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-xs text-muted-foreground">Mine</span>
      </div>
    </div>
  )
}