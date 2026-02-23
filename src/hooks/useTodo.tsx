import { useEffect, useState } from "react";
import type Todo from "../components/todo";
import type { User } from "../types/user";
import { todoService } from "../services/todo";
import { userService } from "../services/user";

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    todoService.getTodos().then((response) => {
      let data = response.map((todo: any) => ({id: todo._id, title: todo.title, completed: todo.completed}));
      setTodos(data);
    }).catch((error) => {
      console.error('Error fetching todos:', error);
    });
    userService.getUsers().then((response) => {
      let data = response.map((user: any) => ({id: user._id, name: user.name, email: user.email, role: user.role}));
      setUsers(data);
    }).catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, []);

  const handleAddTodo = (title: string) => {
    todoService.createTodo(title).then((response) => {
      setTodos([...todos, response]);
    }).catch((error) => {
      console.error('Error adding todo:', error);
    });
  }

  const handleToggleTodo = (id: string) => {
    todoService.updateTodo(id, !todos.find((todo) => todo.id === id)?.completed).then((response) => {
      setTodos(todos.map((todo) => todo.id === id ? {id: response._id, title: response.title, completed: response.completed} : todo));
    }).catch((error) => {
      console.error('Error toggling todo:', error);
    });
  }

  const handleChangeUser = (userId: string) => {
    todoService.getTodosByUserId(userId).then((response) => {
      let data = response.map((todo: any) => ({id: todo._id, title: todo.title, completed: todo.completed}));
      setTodos(data);
    });
  }

  return { todos, users, handleAddTodo, handleToggleTodo, handleChangeUser };
}