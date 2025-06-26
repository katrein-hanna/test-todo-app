import React, { useState } from "react";
import api from "../api/axios";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const toggleCompleted = async () => {
    try {
      const res = await api.put(`/todos/${todo.id}`, {
        is_completed: !todo.is_completed,
      });
      onUpdate(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/todos/${todo.id}`, {
        title: newTitle,
      });
      onUpdate(res.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/todos/${todo.id}`);
      onDelete(todo.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="flex justify-between items-center border p-2 rounded">
      <div className="flex items-center gap-2 w-full">
        <input
          type="checkbox"
          checked={todo.is_completed}
          onChange={toggleCompleted}
          className="accent-blue-600"
        />

        {editing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 border border-blue-300 rounded p-1"
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.is_completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      {editing ? (
        <>
          <button onClick={handleUpdate} className="ml-2">
            <AiOutlineCheck className="icon-style text-green-600 hover:text-green-800" />
          </button>
          <button onClick={() => setEditing(false)} className="ml-2">
            <AiOutlineClose className="icon-style text-gray-600 hover:text-gray-800" />
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setEditing(true)} className="ml-2">
            <AiOutlineEdit className="icon-style text-blue-600 hover:text-blue-800" />
          </button>
          <button onClick={handleDelete} className="ml-2">
            <AiOutlineDelete className="icon-style text-red-600 hover:text-red-800" />
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
