"use client";
import Image from "next/image";
import classes from "./card.module.scss";
import { FaHouse, FaLocationDot, FaPen, FaTrash } from "react-icons/fa6";
import { BiArea } from "react-icons/bi";
import { Listing } from "@/utils/Types";
import { FaCheck } from "react-icons/fa";
import { MdSell } from "react-icons/md";

const costString = (cost: number) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CardDashbaord = ({ listing }: { listing: Listing }) => {
  const deleteListing = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) {
      return;
    }
    const response = await fetch("/api/admin/deleteListing", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Failed to delete listing");
      return;
    }
    const data = await response.json();
    console.log(data);
  };

  const setToSoldListing = async (listing: Listing) => {
    if (
      !confirm(
        `Are you sure you want change state of this listing to ${
          listing.status === "active" ? "sold" : "active"
        }?`
      )
    ) {
      return;
    }

    const status = listing.status === "active" ? "sold" : "active";

    const response = await fetch("/api/admin/setListingToSold", {
      method: "PATCH",
      body: JSON.stringify({ id: listing._id, status: status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Failed to delete listing");
      return;
    }
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className={classes.card}>
      <div className={classes.imageBox}>
        <Image
          width={700}
          height={700}
          alt=""
          src={typeof listing.images[0] === "string" ? listing.images[0] : ""}
        />
      </div>
      <div className={classes.content}>
        <span className={classes.price}>
          <p>{"$" + costString(listing.price)}</p>
        </span>
        <p className={classes.detailedInfo}>
          {listing.title}
          <p className={classes.lessImportant}>
            {listing.location.address}, {listing.location.city},{" "}
            {listing.location.state}
          </p>
        </p>
        <p className={classes.mobileInfo}>
          <span>
            <FaLocationDot />
          </span>
          {listing.location.city}, {listing.location.state}
        </p>
        <p className={classes.mobileInfo}>
          <span>
            <BiArea />
          </span>
          {listing.features.area} m²
        </p>
        <p>
          {listing.features.rooms ? listing.features.rooms + " rooms | " : ""}
          {listing.features.area ? listing.features.area + " m² | " : ""}
          {listing.features.area && listing.price
            ? Math.floor(listing.price / listing.features.area)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " $/m²"
            : ""}
        </p>
        <p className={classes.mobileInfo}>
          <span>
            <FaHouse />
          </span>
          {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
        </p>
        <p style={{ fontSize: "1.5rem" }}>
          Status:{" "}
          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
        </p>
      </div>

      <div className={classes.buttons}>
        <button onClick={() => setToSoldListing(listing)}>
          {/* toggle avaliability */}
          <FaCheck />
        </button>

        {listing.status === "active" ? (
          <button onClick={(e) => e.preventDefault()}>
            {/* set sale */}
            <MdSell />
          </button>
        ) : (
          ""
        )}
        {listing.status === "active" ? (
          <button onClick={(e) => e.preventDefault()}>
            {/* edit listing */}
            <FaPen />
          </button>
        ) : (
          ""
        )}
        <button onClick={() => deleteListing(listing._id)}>
          {/* delete */}
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CardDashbaord;
