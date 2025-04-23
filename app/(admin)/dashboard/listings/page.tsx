"use client";
import { Listing } from "@/utils/Types";
import React, { useEffect, useState } from "react";

const CACHE_EXPIRATION_TIME = 1000 * 60 * 5; // 5 minutes

const Page = () => {
  const [listings, setListings] = useState<Listing[]>([]);
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
        "/api/admin/getData/getListings"
      );
      setListings(messagesData);
      console.log(messagesData);
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
