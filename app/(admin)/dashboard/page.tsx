"use client";
import { useEffect, useState } from "react";
import classes from "./page.module.scss";
import { Listing } from "@/utils/Types";

const Page = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/getData/getListings");
      const data = await response.json();
      setListings(data.data);
      setLoading(false);
      console.log(listings);
    };

    fetchData();
  }, []);

  return (
    <section className={classes.page}>
      <h1>Dashboard</h1>
    </section>
  );
};

export default Page;
