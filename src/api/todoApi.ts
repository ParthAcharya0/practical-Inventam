import axiosInstance from "./axiosInstance"
import type {
  LoginRequest,
  LoginResponse,
  TodosResponse,
  AddTodoRequest,
  Todo,
} from "@/types/todoTypes"
import type { AxiosResponse } from "axios"

export function loginUser(
  credentials: LoginRequest
): Promise<AxiosResponse<LoginResponse>> {
  return axiosInstance.post("/user/login", credentials)
}

export function getTodos(
  limit: number,
  skip: number
): Promise<AxiosResponse<TodosResponse>> {
  return axiosInstance.get("/todos", {
    params: { limit, skip },
  })
}

export function getUserTodos(
  userId: number
): Promise<AxiosResponse<TodosResponse>> {
  return axiosInstance.get(`/users/${userId}/todos`)
}

export function addTodo(
  data: AddTodoRequest
): Promise<AxiosResponse<Todo>> {
  return axiosInstance.post("/todos/add", data)
}
