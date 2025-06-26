import React, { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AiOutlinePlus } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

function Todos() {
  const [loading, setLoading] = useState(true);

  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          alert("Session expired. Please log in.");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
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
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <li className="text-center text-gray-400">No tasks yet.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Todos;
