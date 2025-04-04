"use client";
import { useEffect, useState } from "react";
import classes from "./page.module.scss";
import { DashBoardUser, Listing, User } from "@/utils/Types";
import UsersChart from "@/components/Dashboard/Chart/UsersChart";
import TestForm from "@/components/Dashboard/Form/TestForm";

const Page = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [visitors, setVisitors] = useState<User[]>([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState<DashBoardUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setLoading(true);
      // listings
      const response = await fetch("/api/getData/getListings");
      const data = await response.json();
      setListings(data.data);
      // analitics data
      const visitorsResponse = await fetch(
        "/api/admin/getData/getUsersStats?limit=1"
      );
      const visitorsData = await visitorsResponse.json();
      setVisitors(visitorsData.data);
      // messages
      const messagesResponse = await fetch("/api/admin/getData/getMessages");
      const messagesData = await messagesResponse.json();
      setMessages(messagesData.data);
      // user
      const userResponse = await fetch("/api/auth/userData");
      const userData = await userResponse.json();
      setUser(userData.data);
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {loading ? <p>Loading...</p> : <p>{visitors[0].totalVisits}</p>}
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

      <TestForm />
    </section>
  );
};

export default Page;
