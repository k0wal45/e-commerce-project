"use client";
import React from "react";
import bcrypt from "bcryptjs";

const AuthCheck = () => {
  const check = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/checkToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });

      console.log("Response:", await response.json());

      const hashPassword = async (password: string) => {
        const salt = process.env.HASH_SALT || 10;
        return bcrypt.hash(password, salt);
      };

      // Example usage
      const password = "admin";
      hashPassword(password).then((hashedPassword) => {
        console.log("Hashed Password:", hashedPassword);
      });
    } catch (error) {
      console.error("Error during check:", error);
    }
  };

  return (
    <div>
      <button onClick={check}>Check</button>
    </div>
  );
};

export default AuthCheck;
