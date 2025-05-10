"use client";
import React, { useEffect, useState } from "react";
import classes from "./page.module.scss";
import { Listing } from "@/utils/Types";
import Card from "@/components/Listing/Shop/Card/Card";

const Page = () => {
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedFavorites = localStorage.getItem("favorites");
      if (!storedFavorites) {
        setLoading(false);
        return;
      }
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      if (parsedFavorites.length === 0) {
        setLoading(false);
        return;
      }

      const fetchedArray: Listing[] = [];
      for (const favorite of parsedFavorites) {
        if (!fetchedArray.some((item) => item._id === favorite)) {
          const response = await fetch(
            `/api/getData/getListingById?id=${favorite}`
          );
          const data = await response.json();
          if (
            data &&
            !fetchedArray.some((item) => item._id === data.data._id)
          ) {
            fetchedArray.push(data.data);
            console.log(data);
          }
        }
      }
      setFavorites(fetchedArray);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className={classes.page}>
      <h1>Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : favorites.length === 0 ? (
        <p>No favorites found</p>
      ) : (
        <ul>
          {favorites.map((listing: Listing) => (
            <Card listing={listing} key={listing._id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
