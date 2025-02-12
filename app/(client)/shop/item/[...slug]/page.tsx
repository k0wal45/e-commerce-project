"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import classes from "./page.module.scss";
import { Listing } from "@/utils/Types";

const Page = () => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams(); // Get the query parameters
  const id = searchParams.get("id"); // Get the id from the query string

  useEffect(() => {
    const fetchData = async (id: string | null) => {
      if (id) {
        const response = await fetch("/api/getData/getListingById?id=" + id);
        const data = await response.json();
        setListing(data.data);
        console.log(data.data);
        setLoading(false);
      }
    };

    fetchData(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>No listing found</div>;
  }

  return (
    <article className={classes.page}>
      <div key={listing._id} className={classes.listing}>
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
      </div>
    </article>
  );
};

export default Page;
