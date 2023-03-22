import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo("");
  };
  const submitHandle = (event) => {
    event.preventDefault();
  };
  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={submitHandle}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your tasks"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />

        <button onClick={addTodo}>ADD</button>
      </form>

      <div className="list">
        <ul>
          {todos.map((to) => (
            <li key={todos.index}>{to}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
