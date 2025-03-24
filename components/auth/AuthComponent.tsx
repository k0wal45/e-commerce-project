"use client";

import { useState } from "react";

export default function AuthComponent() {
  const [data, setData] = useState<string | null>(null);

  const login = async () => {
    try {
      const response = await fetch("/api/auth/generateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@admin.pl",
          user: "admin",
          password: "admin",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseBody = await response.json(); // Parse the response body as JSON
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
