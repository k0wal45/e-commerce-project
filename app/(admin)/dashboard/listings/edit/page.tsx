"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams(); // Get the query parameters
  const id = searchParams.get("id"); // Get the id from the query string

  return <div>{id}</div>;
};

export default Page;
