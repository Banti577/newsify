import React, { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";


const Login = ({setUser}) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
         setUser(data.user);
        alert("Login SuccessFull");
       
        navigate("/");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.message || "Failed to sign up");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Login</h2>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.inputGroup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default Login;
