"use client";
import { Listing } from "@/utils/Types";
import styles from "./listing.module.scss";
import Image from "next/image";
import Link from "next/link";
import { BiArea } from "react-icons/bi";

function ListingItem({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/shop/item/${listing.category}?id=${listing._id}`}
      className={styles.categoryListingLink}
    >
      <Image
        width={600}
        height={400}
        src={
          typeof listing.images[0] === "string"
            ? listing.images[0]
            : URL.createObjectURL(listing.images[0])
        }
        alt={listing.title}
        className={styles.categoryListingImg}
        loading="lazy"
      />
      <div className={styles.categoryListingDetails}>
        <p className={styles.categoryListingLocation}>
          {listing.location.state}
        </p>
        <p className={styles.categoryListingName}>{listing.title}</p>
        <p className={styles.categoryListingPrice}>
          $
          {listing.promotion.isActive
            ? listing.promotion.discountType ===
              "percentage".toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <div className={styles.categoryListingInfoDiv}>
          <BiArea />
          <p className={styles.categoryListingInfoText}>
            {listing.features.area} m<sup>2</sup>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ListingItem;
