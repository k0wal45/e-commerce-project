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

      const hashPassword = async (password: string) => {
        const saltRounds = 10; // Recommended is 10-12 for good security
        return await bcrypt.hash(password, saltRounds);
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
