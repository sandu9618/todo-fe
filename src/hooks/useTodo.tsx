import { useEffect, useState } from "react";
import type Todo from "../components/todo";
import api from "../intercepter/axiosInstance";

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    api.get('/todos').then((response) => {
      let data = response.data.map((todo: any) => ({id: todo._id, title: todo.title, completed: todo.completed}));
      setTodos(data);
    }).catch((error) => {
      console.error('Error fetching todos:', error);
    });
  }, []);

  const handleAddTodo = (title: string) => {
    api.post('/todos', { title }).then((response) => {
      setTodos([...todos, response.data]);
    }).catch((error) => {
      console.error('Error adding todo:', error);
    });
  }

  const handleToggleTodo = (id: string) => {
    api.put(`/todos/${id}`, { completed: !todos.find((todo) => todo.id === id)?.completed }).then((response) => {
      setTodos(todos.map((todo) => todo.id === id ? {id: response.data._id, title: response.data.title, completed: response.data.completed} : todo));
    }).catch((error) => {
      console.error('Error toggling todo:', error);
    });
  }

  return { todos, handleAddTodo, handleToggleTodo };
}