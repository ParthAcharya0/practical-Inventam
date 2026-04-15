import type { Todo } from "@/types/todoTypes"

interface TodoListSectionProps {
  loading: boolean
  errorMessage: string | null
  todos: Todo[]
  filterMine: boolean
  onRetry: () => void
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg
        className="h-8 w-8 animate-spin text-primary"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <p className="mt-3 text-sm text-muted-foreground">Loading your todos...</p>
    </div>
  )
}

function ErrorState({
  errorMessage,
  onRetry,
}: {
  errorMessage: string
  onRetry: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-4 text-center">
        <p className="text-sm text-destructive">{errorMessage}</p>
        <button
          onClick={onRetry}
          className="mt-3 text-xs font-medium text-primary underline underline-offset-2 hover:no-underline"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

function EmptyState({ filterMine }: Pick<TodoListSectionProps, "filterMine">) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-foreground">No todos found</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {filterMine
          ? "You do not have any todos yet. Add one above."
          : "No todos available right now."}
      </p>
    </div>
  )
}

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-md">
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm leading-relaxed ${
            todo.completed
              ? "text-muted-foreground line-through"
              : "text-foreground"
          }`}
        >
          {todo.todo}
        </p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Created by user #{todo.userId}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase ${
          todo.completed
            ? "bg-green-500/10 text-green-600 dark:text-green-400"
            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        }`}
      >
        {todo.completed ? "Done" : "Pending"}
      </span>
    </li>
  )
}

export default function TodoListSection({
  loading,
  errorMessage,
  todos,
  filterMine,
  onRetry,
}: TodoListSectionProps) {
  if (loading) {
    return <LoadingState />
  }

  if (errorMessage) {
    return <ErrorState errorMessage={errorMessage} onRetry={onRetry} />
  }

  if (todos.length === 0) {
    return <EmptyState filterMine={filterMine} />
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
