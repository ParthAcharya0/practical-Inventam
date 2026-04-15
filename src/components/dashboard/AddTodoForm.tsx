import type { FormEvent } from "react"

interface AddTodoFormProps {
  newTodoText: string
  onTextChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  addingTodo: boolean
  addError: string | null
}

export default function AddTodoForm({
  newTodoText,
  onTextChange,
  onSubmit,
  addingTodo,
  addError,
}: AddTodoFormProps) {
  return (
    <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
        Add todo
      </h2>
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          id="add-todo-input"
          type="text"
          value={newTodoText}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground"
        />
        <button
          id="add-todo-submit"
          type="submit"
          disabled={addingTodo}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
        >
          {addingTodo ? "Adding" : "Add todo"}
        </button>
      </form>
      {addError && <p className="mt-3 text-sm text-destructive">{addError}</p>}
    </div>
  )
}
