"use client";
import React from "react";

const AuthCheck = () => {
  const check = async () => {
    try {
      const response = await fetch("/api/auth/userData");

      console.log("Response:", await response.json());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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
