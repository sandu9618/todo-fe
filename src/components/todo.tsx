import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../intercepter/axiosInstance";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function Todo() {
  const authContext = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({id: "", title: "", completed: false});
  
  if (!authContext) {
    throw new Error("Todo must be used within AuthProvider");
  }
  
  useEffect(() => {
    api.get('/todos').then((response) => {
      console.log(response.data);
      let data = response.data.map((todo: any) => ({id: todo._id, title: todo.title, completed: todo.completed}));
      setTodos(data);
    }).catch((error) => {
      console.error('Error fetching todos:', error);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewTodo((prev) => ({...prev, [name]: value}));
  }
  
  const handleAddTodo = () => {
    api.post('/todos', newTodo).then((response) => {
      let data = {id: response.data._id, title: response.data.title, completed: response.data.completed};
      setTodos([...todos, data]);
    }).catch((error) => {
      console.error('Error adding todo:', error);
    });
  }

  const handleToggleTodo = (id: string) => {
    api.put(`/todos/${id}`, { completed: !todos.find((todo) => todo.id === id)?.completed }).then((response) => {
      let data = {id: response.data._id, title: response.data.title, completed: response.data.completed};
      setTodos(todos.map((todo) => todo.id === id ? data : todo));
    }).catch((error) => {
      console.error('Error toggling todo:', error);
    });
  }

  return (
    <div>
      <h2>Todo</h2>
      {todos.map((todo) => (
        <div key={todo.id} className="row">
          <h3>{todo.title}</h3>
          <p>{todo.completed ? "Completed" : "Not Completed"}</p>
          <button onClick={() => handleToggleTodo(todo.id)}>Toggle</button>
        </div>
      ))}
      <input type="text" placeholder="Add a new todo" name="title" value={newTodo.title} onChange={handleChange} />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  )
}

export default Todo;