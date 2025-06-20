"use client";
import classes from "./display.module.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Listing } from "@/utils/Types";
import Loader from "@/components/Loader";
import Card from "./Card/Card";
import Pagination from "./Pagination/Pagination";
import fetchWithCache from "@/lib/fetchWithCache";

const DisplayListings = () => {
  const [listings, setListing] = useState<Listing[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams(); // Get the query parameters
  const limit =
    searchParams.get("limit") === null || undefined || 0
      ? 10
      : searchParams.get("limit");

  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async (
      limit: string | null | number,
      page: string | null | number
    ) => {
      if (limit && page) {
        const data = await fetchWithCache(
          "listings-limit-" +
            limit +
            "-page-" +
            page +
            (category ? `-category-${category}` : ""),
          "/api/getData/getListings?limit=" +
            limit +
            "&page=" +
            page +
            (category ? `&category=${category}` : "")
        );

        setListing(data);
        setLoading(false);
      }
    };

    fetchData(limit, currentPage);
  }, [limit, currentPage, category]);

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
