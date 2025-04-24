"use client";
import fetchWithCache from "@/lib/fetchWithCache";
import { Listing } from "@/utils/Types";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

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
