import React, { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AiOutlinePlus } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          alert("Session expired. Please log in.");
          navigate("/login");
        }
      });
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const res = await api.post("/todos", { title: newTitle });
      setTodos([res.data, ...todos]);
      setNewTitle("");
    } catch (err) {
      console.error(err);
      alert("Failed to add todo");
    }
  };

  const handleUpdate = (updatedTodo) => {
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="main-container">
      <div className="todo-box">
        <div className="flex justify-between items-center mb-4">
          <h2 className="form-title">My Todos</h2>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm gap-1 text-red-600 hover:text-red-800 cursor-pointer"
          >
            Logout
            <FiLogOut className="icon-style " />
          </button>
        </div>

        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 border border-blue-300 p-2 rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <AiOutlinePlus className="text-white icon-style" />
          </button>
        </form>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
