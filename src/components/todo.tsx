import { useAuth } from "../hooks/useAuth";
import { useFormInput } from "../hooks/useFormInput";
import { useTodo } from "../hooks/useTodo";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function Todo() {
  const title = useFormInput();
  const { todos, users, handleAddTodo, handleToggleTodo, handleChangeUser } = useTodo();
  const { role } = useAuth();

  return (
    <div>
      <h2>Todo</h2>
      {role === "ADMIN" && (
      <select name="user" id="user" onChange={(e) => handleChangeUser(e.target.value)}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      )}
      {todos.map((todo) => (
        <div key={todo.id} className="row">
          <h3>{todo.title}</h3>
          <p>{todo.completed ? "Completed" : "Not Completed"}</p>
          <button onClick={() => handleToggleTodo(todo.id)}>Toggle</button>
        </div>
      ))}
      <input type="text" placeholder="Add a new todo" name="title" value={title.value} onChange={title.handleChange} />
      <button onClick={() => handleAddTodo(title.value)}>Add</button>
    </div>
  )
}

export default Todo;