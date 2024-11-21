"use client";
import { FaTrashAlt, FaEdit, FaBed, FaBath } from "react-icons/fa";
import styles from "./listing.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Listing {
  id: string;
  type: string;
  name: string;
  location: string;
  imageUrls: string[];
  offer: boolean;
  discountedPrice?: number;
  regularPrice: number;
  bedrooms: number;
  bathrooms: number;
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
          <div>
            <FaBed />
            <p className={styles.categoryListingInfoText}>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
          </div>
          <div>
            <FaBath />
            <p className={styles.categoryListingInfoText}>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingItem;
