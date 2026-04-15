import { useState, useEffect, type FormEvent } from "react"
import { useAuth } from "@/context/AuthContext"
import { getTodos, getUserTodos, addTodo } from "@/api/todoApi"
import type { Todo } from "@/types/todoTypes"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import AddTodoForm from "@/components/dashboard/AddTodoForm"
import TodoToolbar from "@/components/dashboard/TodoToolbar"
import TodoListSection from "@/components/dashboard/TodoListSection"
import TodoPagination from "@/components/dashboard/TodoPagination"

const TODOS_PER_PAGE = 3

export default function Dashboard() {
  const { user, logout } = useAuth()

  const [visitCount, setVisitCount] = useState(0)
  useEffect(() => {
    const key = "dashboard_visit_count"
    const current = parseInt(localStorage.getItem(key) || "0", 10)
    const next = current + 1
    localStorage.setItem(key, String(next))
    setVisitCount(next)
  }, [])

  const [todos, setTodos] = useState<Todo[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filterMine, setFilterMine] = useState(false)

  const totalPages = Math.max(1, Math.ceil(total / TODOS_PER_PAGE))

  async function fetchTodos() {
    setLoading(true)
    setError(null)
    try {
      if (filterMine && user) {
        const res = await getUserTodos(user.id)
        setTodos(res.data.todos)
        setTotal(res.data.total)
      } else {
        const skip = (page - 1) * TODOS_PER_PAGE
        const res = await getTodos(TODOS_PER_PAGE, skip)
        setTodos(res.data.todos)
        setTotal(res.data.total)
      }
    } catch {
      setError("Could not load the todos. Try again in a moment.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [page, filterMine, user])

  useEffect(() => {
    setPage(1)
  }, [filterMine])

  const [newTodoText, setNewTodoText] = useState("")
  const [addingTodo, setAddingTodo] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)

  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAddError(null)

    if (!newTodoText.trim()) {
      setAddError("Please enter a todo.")
      return
    }
    if (!user) return

    setAddingTodo(true)
    try {
      const res = await addTodo({
        todo: newTodoText.trim(),
        completed: false,
        userId: user.id,
      })
      setTodos((prev) => [res.data, ...prev])
      setTotal((prev) => prev + 1)
      setNewTodoText("")
    } catch {
      setAddError("Could not add the todo. Please try again.")
    } finally {
      setAddingTodo(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} visitCount={visitCount} onLogout={logout} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <AddTodoForm
          newTodoText={newTodoText}
          onTextChange={setNewTodoText}
          onSubmit={handleAddTodo}
          addingTodo={addingTodo}
          addError={addError}
        />

        <TodoToolbar
          filterMine={filterMine}
          total={total}
          loading={loading}
          onToggleFilter={() => setFilterMine((prev) => !prev)}
        />

        <TodoListSection
          loading={loading}
          errorMessage={error}
          todos={todos}
          filterMine={filterMine}
          onRetry={fetchTodos}
        />

        {!loading && !error && !filterMine && totalPages > 1 && (
          <TodoPagination
            page={page}
            totalPages={totalPages}
            onPrevious={() =>
              setPage((currentPage) => Math.max(1, currentPage - 1))
            }
            onNext={() =>
              setPage((currentPage) => Math.min(totalPages, currentPage + 1))
            }
          />
        )}
      </main>
    </div>
  )
}
