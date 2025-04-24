"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import classes from "./pagination.module.scss";
import React from "react";

const Pagination = ({
  setCurrentPage,
  currentPage,
  length,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  length: number;
}) => {
  const handlePageChange = (newPage: number) => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log("Page changed to: " + newPage);
    }
    setCurrentPage(newPage);
  };

  return (
    <div className={classes.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowLeft />
        Previous
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={length < 10}
      >
        Next
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
