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
  return (
    <div className={classes.pagination}>
      <button
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <FaArrowLeft />
        Previous
      </button>
      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
        disabled={length < 10}
      >
        Next
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
