import React from "react";
import Filter from "./Filter/Filter";
import Card from "./Card/Card";
import classes from "./display.module.scss";

const DisplayListings = () => {
  return (
    <section className={classes.featured}>
      <h2>Home Office Essentials</h2>
      <Filter />
      <ul>
        <Card />
        <Card />
        <Card />
        <Card />
      </ul>
    </section>
  );
};

export default DisplayListings;
