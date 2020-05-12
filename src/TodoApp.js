import React, { useState, useEffect } from "react";

function TodoApp() {
  const API_URL = "https://vaadin-todo-api.herokuapp.com/todos";
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL, { method: "POST", body: task });
    setTodos([...todos, await res.json()]);
    setTask("");
  };

  const clearTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const getTodos = async () => {
      const result = await fetch(API_URL);
      setTodos(await result.json());
    };
    getTodos();
  }, []);

  return (
    <div className="TodoApp">
      <h1>Todo</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}{" "}
            <button onClick={() => clearTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
