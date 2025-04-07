"use client";

import { useState } from "react";

export default function AuthComponent() {
  const [data, setData] = useState<string | null>(null);

  const login = async () => {
    try {
      const password = "adminpassword"; // Replace with the password you want to hash

      const response = await fetch("/api/auth/generateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@admin.com",
          username: "admin",
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseBody = await response.json(); // Parse the response body as JSON

      if (!responseBody.token) {
        localStorage.removeItem("token");
        throw new Error("Token not found in response body");
      }
      console.log(responseBody);
      localStorage.setItem("token", responseBody.token);
      setData(responseBody.token);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <button onClick={login}>login</button>
      {data && (
        <div>
          <h1>Token</h1>
          <p>{data}</p>
        </div>
      )}
    </div>
  );
}
