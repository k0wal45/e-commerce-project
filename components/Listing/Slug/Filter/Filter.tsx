"use client";
import React from "react";
import classes from "./filter.module.scss";

const Filter: React.FC = () => {
  return (
    <div className={classes.filterContainer}>
      <div className={classes.container}>
        <select name="category" id="category">
          <option value="apartments">Apartments</option>
          <option value="studios">Studios</option>
          <option value="houses">Houses</option>
          <option value="investments">Investments</option>
          <option value="rooms">Rooms</option>
          <option value="plots">Plots</option>
          <option value="commercial_units">Commercial Units</option>
          <option value="warehouses">Warehouses</option>
          <option value="garages">Garages</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
