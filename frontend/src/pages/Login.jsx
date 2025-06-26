import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.token);
      navigate("/todos");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        console.log("Validation errors:", err.response.data.errors);
        setErrors(err.response.data.errors);
      } else {
        alert("Login failed");
      }
    }
  };
  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="form-input"
          required
        />
        <br />
        {errors.email &&
          errors.email[0] === "These credentials do not match our records." && (
            <p className="text-red-500 text-sm mb-4 text-center">
              Invalid email or password
            </p>
          )}

        <button type="submit" className="form-button">
          Login
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
