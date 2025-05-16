"use client";
import fetchWithCache from "@/lib/fetchWithCache";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const messagesData = await fetchWithCache(
        "messages",
        "/api/admin/getData/getMessages"
      );
      setMessages(messagesData);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>promotions</h1>
      <button onClick={() => console.log(messages)}>H</button>
    </div>
  );
};

export default Page;
