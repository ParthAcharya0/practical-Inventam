interface DashboardHeaderUser {
  firstName: string
  image: string
}

interface DashboardHeaderProps {
  user: DashboardHeaderUser | null
  visitCount: number
  onLogout: () => void
}

export default function DashboardHeader({
  user,
  visitCount,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-xl font-bold tracking-tight text-foreground">
            Todo Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div
            id="visit-count-badge"
            className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
            title="Number of visits"
          >
            Visits: {visitCount}
          </div>

          {user && (
            <div className="hidden items-center gap-2 sm:flex">
              <img
                src={user.image}
                alt={user.firstName}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-foreground">
                {user.firstName}
              </span>
            </div>
          )}

          <button
            id="logout-button"
            onClick={onLogout}
            className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}