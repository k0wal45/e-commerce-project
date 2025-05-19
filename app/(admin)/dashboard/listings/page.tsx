"use client";
import { Listing } from "@/utils/Types";
import React, { Fragment, useEffect, useState } from "react";
import classes from "../page.module.scss";
import TestForm from "@/components/Dashboard/Form/TestForm";
import CardDashbaord from "@/components/Dashboard/Listings/CardDashboard/CardDashboard";

const Page = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [listingLimit, setListingLimit] = useState(10);
  const [listingToEdit, setListingToEdit] = useState<Listing | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetch(
        `/api/admin/getData/getAllListings?limit=${listingLimit}`
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
  }, [listingLimit]);

  return (
    <div className={classes.page}>
      <h1>House marketplace listings</h1>
      <div className={classes.cols}>
        <div className={classes.listings}>
          {loading ? (
            <p>Loading...</p>
          ) : listings.length > 0 ? (
            <Fragment>
              {listings.map((listing) => {
                return (
                  <CardDashbaord
                    key={listing._id}
                    listing={listing}
                    setListingToEdit={setListingToEdit}
                  />
                );
              })}
              <button
                className={classes.pagination}
                onClick={() => {
                  if (listings.length % 10 !== 0) {
                    console.log("No more listings to load");
                    return;
                  }
                  setListingLimit((prev) => prev + 10);
                }}
                style={{
                  color: listings.length % 10 !== 0 ? "gray" : "black",
                  cursor:
                    listings.length % 10 !== 0 ? "not-allowed" : "pointer",
                }}
              >
                Load more
              </button>
            </Fragment>
          ) : (
            <p>No listings found</p>
          )}
        </div>
        <TestForm data={listingToEdit} />
      </div>
    </div>
  );
};

export default Page;
