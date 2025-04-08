"use client";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    check: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (formData.check) {
      alert("You bot");
      return false;
    }

    try {
    } catch (error) {
      console.error("Error:", error);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form action="">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ display: "none" }}>
        <input
          type="checkbox"
          id="check"
          name="check"
          value={formData.check}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
