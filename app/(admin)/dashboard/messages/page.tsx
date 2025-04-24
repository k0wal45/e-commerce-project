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
  return (
    <div>
      <h1>promotions</h1>
    </div>
  );
};

export default Page;
