import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { MdFileDownloadDone } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now() }]);
      setTodo("");
    }
    if (editId) {
      const editTodo = todos.find((to) => to.id === editId);
      const updateTodo = todos.map((to) =>
        to.id === editTodo.id
          ? (to = { id: to.id, list: todo })
          : (to = { id: to.id, list: to.list })
      );
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
    }
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
  const onEdit = (id) => {
    let editItem = todos.find((to) => to.id === id);
    setTodo(editItem.list);
    setEditId(editItem.id);
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

        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
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
                  onClick={() => onEdit(to.id)}
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
