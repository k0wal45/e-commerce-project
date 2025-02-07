"use client";
import { useEffect, useState } from "react";
import ListingItem from "./Card/ListingCard";
import classes from "./latest.module.scss";
import { Listing } from "@/utils/Types";

const LatestListing = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/getData/getListings?limit=6");
      const data = await response.json();
      setListings(data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className={classes.latest}>
      <h3>Check latest offers</h3>
      <div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          listings.map((item) => <ListingItem key={item._id} listing={item} />)
        )}
      </div>
    </section>
  );
};

export default LatestListing;
