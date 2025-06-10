import type { Todo } from "../types/Todo";
import apiClient from "./apiClient";


export const getAllTodo = async (): Promise<Todo[]> => {
  try {
    const response = await apiClient.get<Todo[]>('/todos');
    return Array.isArray(response.data) ? response.data : []
  }
  catch (error) {
    console.log('Error fetching todos : ', error);
    return [];
  }
};

export const addTodoApi = async (text: string) : Promise<Todo> => {
  try {
    const response = await apiClient.post('/todos', {text, completed: false});
    return response.data;
  }
  catch (error) {
    console.log("Error adding todo: ", error);
  }
};

export const toggleTodoApi = async(id: number, completed: boolean): Promise<Todo> => {
  try {
    const response = await apiClient.patch<Todo>(`/todos/${id}`, {completed: !completed});
    return response.data;
  } catch (error) {
    console.log(`Error toggling todo: ${id} : `, error);
    throw error;
  }
}

export const deleteTodoApi = async(id: number): Promise<void> => {
  try {
    await apiClient.delete(`/todos/${id}`)
  } catch (error) {
    console.log(`Error deleteting todo: ${id} : `, error);
    throw error;
  }
}