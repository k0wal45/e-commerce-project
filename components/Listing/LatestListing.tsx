"use client";
import { useEffect, useState } from "react";
import ListingItem from "./Card/ListingCard";
import classes from "./latest.module.scss";
import { Listing } from "@/utils/Types";
import Loader from "../Loader";

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <Loader />
          </div>
        ) : (
          listings.map((item) => <ListingItem key={item._id} listing={item} />)
        )}
      </div>
    </section>
  );
};

export default LatestListing;
