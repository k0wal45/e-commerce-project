"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import classes from "./page.module.scss";
import { Listing } from "@/utils/Types";
import Images from "@/components/Listing/Slug/Images/Images";
import { FaAngleLeft, FaHeart, FaShare } from "react-icons/fa6";
const copyUrlToClipboard = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      alert("URL copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

const Page = () => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams(); // Get the query parameters
  const id = searchParams.get("id"); // Get the id from the query string

  useEffect(() => {
    const fetchData = async (id: string | null) => {
      if (id) {
        const response = await fetch("/api/getData/getListingById?id=" + id);
        const data = await response.json();
        setListing(data.data);
        console.log(data.data);
        setLoading(false);
      }
    };

    fetchData(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>No listing found</div>;
  }

  return (
    <article className={classes.page}>
      {/* navigation */}
      <div className={classes.navigation}>
        <div>
          <div onClick={() => history.back()}>
            <FaAngleLeft style={{ fontSize: "1.6rem" }} />
            Back
          </div>
        </div>

        <div>
          <div onClick={copyUrlToClipboard}>
            <FaShare style={{ fontSize: "1.6rem" }} />
            Share
          </div>
          <div onClick={() => alert("Succesfuly saved")}>
            <FaHeart style={{ fontSize: "1.6rem" }} />
            Save
          </div>
        </div>
      </div>
      <Images images={listing.images} />
    </article>
  );
};

export default Page;
