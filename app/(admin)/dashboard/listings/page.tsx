"use client";
import { Listing } from "@/utils/Types";
import React, { useEffect, useState } from "react";
import classes from "../page.module.scss";
import TestForm from "@/components/Dashboard/Form/TestForm";
import CardDashbaord from "@/components/Dashboard/Listings/CardDashboard/CardDashboard";

const Page = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetch(
        "/api/admin/getData/getAllListings?limit=10"
      );
      if (!response.ok) {
        console.error("Failed to fetch listings data");
        setLoading(false);
        return;
      }
      const listingsData = await response.json();

      setListings(listingsData.data);
      console.log(listingsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.page}>
      <h1>House marketplace listings</h1>
      <div className={classes.cols}>
        <div className={classes.listings}>
          {loading ? (
            <p>Loading...</p>
          ) : listings.length > 0 ? (
            listings.map((listing) => {
              return <CardDashbaord key={listing._id} listing={listing} />;
            })
          ) : (
            <p>No listings found</p>
          )}
        </div>
        <TestForm />
      </div>
    </div>
  );
};

export default Page;
