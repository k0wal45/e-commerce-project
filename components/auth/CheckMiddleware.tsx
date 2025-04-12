"use client";
import React from "react";

const CheckMiddleware = () => {
  const check = async () => {
    try {
      const response = await fetch("/api/test");

      console.log("Response:", await response.json());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during check:", error);
    }
  };

  return (
    <div style={{ padding: "1rem", backgroundColor: "lightblue" }}>
      <button onClick={check}>Check test route</button>
    </div>
  );
};

export default CheckMiddleware;
