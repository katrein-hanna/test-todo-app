import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await api.post("/register", form);
      console.log(res);

      localStorage.setItem("token", res.data.token);
      navigate("/todos");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        console.log("Validation errors:", err.response.data.errors);
        setErrors(err.response.data.errors);
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">Register</h2>

        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-input"
          required
        />

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

        <input
          name="password_confirmation"
          type="password"
          placeholder="Confirm Password"
          value={form.password_confirmation}
          onChange={handleChange}
          className="form-input"
          required
        />

        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name[0]}</p>
        )}
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email[0]}</p>
        )}
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password[0]}</p>
        )}
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm">
            {errors.password_confirmation[0]}
          </p>
        )}
        <br />
        <button type="submit" className="form-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
