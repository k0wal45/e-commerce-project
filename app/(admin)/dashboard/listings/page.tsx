"use client";
import fetchWithCache from "@/lib/fetchWithCache";
import { Listing } from "@/utils/Types";
import React, { useEffect, useState } from "react";
import classes from "../page.module.scss";
import DisplayListings from "@/components/Listing/Shop/DisplayListings";
import TestForm from "@/components/Dashboard/Form/TestForm";

const Page = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const listingsData = await fetchWithCache(
        "listings-dashboard",
        "/api/getData/getListings?limit=10"
      );
      setListings(listingsData);
      console.log(listingsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.page}>
      <h1>House marketplace listings</h1>
      <div className={classes.cols}>
        <DisplayListings />
        <TestForm />
      </div>
    </div>
  );
};

export default Page;
