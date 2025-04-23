"use client";
import React, { useEffect, useState } from "react";

const CACHE_EXPIRATION_TIME = 1000 * 60 * 5; // 5 minutes

const Page = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithCache = async (key: string, url: string) => {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
        return data;
      }
    }

    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem(
      key,
      JSON.stringify({ data: data.data, timestamp: Date.now() })
    );
    return data.data;
  };

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
