import api from "../intercepter/axiosInstance";

export const todoService = {
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },
  createTodo: async (title: string) => {
    const response = await api.post('/todos', { title });
    return response.data;
  },
  updateTodo: async (id: string, completed: boolean) => {
    const response = await api.put(`/todos/${id}`, { completed });
    return response.data;
  },
  getTodosByUserId: async (userId: string) => {
    const response = await api.get(`/todos/${userId}`);
    return response.data;
  }
}