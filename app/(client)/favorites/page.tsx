"use client";
import React, { useEffect, useState } from "react";
import classes from "./page.module.scss";

const Page = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedFavorites = localStorage.getItem("favorites");
      if (!favorites) return;
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      parsedFavorites.forEach((favorite: string) => {});
      const response = await fetch(
        `/api/getData/getListingsById?id=${parsedFavorites}`
      );
      const data = await response.json();

      console.log(data);

      // const response = await fetch(
      //   `/api/getData/getListingsById?id=${favorites}`
      // );
      // const data = await response.json();
      // console.log(data);
    };
    fetchData();
  }, []);
  return <div className={classes.page}></div>;
};

export default Page;
