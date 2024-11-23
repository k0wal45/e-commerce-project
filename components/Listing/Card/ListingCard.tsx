"use client";
import styles from "./listing.module.scss";
import Image from "next/image";
import Link from "next/link";
import { BiArea } from "react-icons/bi";

interface Listing {
  id: string;
  type: string; // Możesz zezwolić na dowolny ciąg
  name: string;
  location: string;
  imageUrls: string[];
  offer: boolean;
  discountedPrice?: number;
  regularPrice: number;
  area: number;
}

function ListingItem({
  listing,
  id,
}: {
  listing: Listing;
  id: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string, name: string) => void;
}) {
  return (
    <Link
      href={`/category/${listing.type}/${id}`}
      className={styles.categoryListingLink}
    >
      <Image
        width={600}
        height={400}
        src={listing.imageUrls[0]}
        alt={listing.name}
        className={styles.categoryListingImg}
      />
      <div className={styles.categoryListingDetails}>
        <p className={styles.categoryListingLocation}>{listing.location}</p>
        <p className={styles.categoryListingName}>{listing.name}</p>
        <p className={styles.categoryListingPrice}>
          $
          {listing.offer && listing.discountedPrice
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          {listing.type === "rent" && " / Month"}
        </p>
        <div className={styles.categoryListingInfoDiv}>
          <BiArea />
          <p className={styles.categoryListingInfoText}>
            {listing.area} m<sup>2</sup>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ListingItem;
