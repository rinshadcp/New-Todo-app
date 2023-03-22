import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { MdFileDownloadDone } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodo = () => {
    setTodos([...todos, { list: todo, id: Date.now() }]);
    setTodo("");
  };
  const submitHandle = (event) => {
    event.preventDefault();
  };
  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });
  const deleteItem = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };
  const onComplete = (id) => {
    let complete = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    });
    setTodos(complete);
  };

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
            <li key={to.id} className="list-items">
              <div
                className="list-items-list"
                id={to.status ? "list-item" : ""}
              >
                {to.list}
              </div>
              <span>
                <MdFileDownloadDone
                  className="list-items-icons"
                  id="done"
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
                <MdEditNote
                  className="list-items-icons"
                  id="edit"
                  title="Edit"
                />
                <MdDeleteSweep
                  className="list-items-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => deleteItem(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
