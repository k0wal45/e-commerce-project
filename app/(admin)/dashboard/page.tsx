"use client";
import { useEffect, useState } from "react";
import classes from "./page.module.scss";
import { DashBoardUser, Listing, User } from "@/utils/Types";
import UsersChart from "@/components/Dashboard/Chart/UsersChart";

const CACHE_EXPIRATION_TIME = 1000 * 60 * 5; // 5 minutes

const Page = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [visitors, setVisitors] = useState<User[]>([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState<DashBoardUser>();
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

      const listingsData = await fetchWithCache(
        "listings",
        "/api/getData/getListings"
      );
      setListings(listingsData);

      const visitorsData = await fetchWithCache(
        "visitors",
        "/api/admin/getData/getUsersStats?limit=1"
      );
      setVisitors(visitorsData);

      const messagesData = await fetchWithCache(
        "messages",
        "/api/admin/getData/getMessages"
      );
      setMessages(messagesData);

      const userData = await fetchWithCache("user", "/api/auth/userData");
      setUser(userData);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className={classes.page}>
      <h1>
        House marketplace dashboard{user ? `, Hello ${user.username}` : ""}
      </h1>

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
        <div className={`${classes.container} ${classes.ActiveListings}`}>
          <h2>Visitors this month:</h2>
          {loading ? <p>Loading...</p> : <p>{visitors[0]?.totalVisits || 0}</p>}
        </div>
        <div className={`${classes.container} ${classes.ActiveListings}`}>
          <h2>New Messages:</h2>
          {loading ? <p>Loading...</p> : <p>{messages.length}</p>}
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
