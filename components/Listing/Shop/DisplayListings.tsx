"use client";
import classes from "./display.module.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Listing } from "@/utils/Types";
import Loader from "@/components/Loader";
import Card from "./Card/Card";
import Pagination from "./Pagination/Pagination";

const DisplayListings = () => {
  const [listings, setListing] = useState<Listing[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams(); // Get the query parameters
  const limit =
    searchParams.get("limit") === null || undefined || 0
      ? 10
      : searchParams.get("limit");

  useEffect(() => {
    const fetchData = async (
      limit: string | null | number,
      page: string | null | number
    ) => {
      if (limit && page) {
        const response = await fetch(
          "/api/getData/getListings?limit=" + limit + "&page=" + page
        );
        const data = await response.json();
        setListing(data.data);
        console.log(data.data);
        setLoading(false);
      }
    };

    fetchData(limit, currentPage);
  }, [limit, currentPage]);

  if (loading) {
    return (
      <div className={classes.container}>
        <Loader />
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className={classes.container}>
        <p>No listings found</p>;
      </div>
    );
  }

  return (
    <section className={classes.featured}>
      <ul>
        {listings.map((listing: Listing) => (
          <Card listing={listing} key={listing._id} />
        ))}
      </ul>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        length={listings.length}
      />
    </section>
  );
};

export default DisplayListings;
