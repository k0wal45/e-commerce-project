"use client";
import { useEffect, useState } from "react";
import classes from "./page.module.scss";
import { Listing } from "@/utils/Types";
import UsersChart from "@/components/Dashboard/Chart/UsersChart";

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
      <h1>House Marketplace Dashboard</h1>

      <div className={classes.upperStats}>
        <div className={`${classes.container} ${classes.ActiveListings}`}>
          <h2>Active Listings:</h2>
          {loading ? <p>Loading...</p> : <p>{listings.length}</p>}
        </div>

        <div className={`${classes.container} ${classes.ActiveListings}`}>
          <h2>New Listings past month</h2>

          <p>
            {loading
              ? "Loading..."
              : listings.filter((listing: Listing) => {
                  const oneMonthAgo = new Date();
                  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                  return (
                    listing.createdAt &&
                    new Date(listing.createdAt) > oneMonthAgo
                  );
                }).length}
          </p>
        </div>
      </div>

      <div className={`${classes.container} ${classes.chart}`}>
        <h2>Monthly Visitors</h2>
        <UsersChart />
      </div>
    </section>
  );
};

export default Page;
