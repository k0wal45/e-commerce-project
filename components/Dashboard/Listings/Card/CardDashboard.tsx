import Image from "next/image";
import classes from "./card.module.scss";
import {
  FaHeart,
  FaHouse,
  FaLocationDot,
  FaPen,
  FaPhone,
} from "react-icons/fa6";
import { BiArea } from "react-icons/bi";
import Link from "next/link";
import { Listing } from "@/utils/Types";
import { usePathname } from "next/navigation";

const costString = (cost: number) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CardDashbaord = ({ listing }: { listing: Listing }) => {
  const path = usePathname();
  return (
    <Link
      href={`/shop/item/${listing.category}?id=${listing._id}`}
      className={classes.card}
    >
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

        <div className={classes.buttons}>
          <button
            onClick={() =>
              alert(
                typeof listing.seller.phone === "string"
                  ? listing.seller.phone.startsWith("+")
                    ? listing.seller.phone
                    : "+" +
                      listing.seller.phone.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        "($1) $2-$3"
                      )
                  : listing.seller.phone
                  ? listing.seller.phone
                      .toString()
                      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
                  : ""
              )
            }
          >
            <FaPhone />
          </button>
          <button onClick={(e) => e.preventDefault()}>
            <FaHeart />
          </button>
          {path === "/dashboard/listings" ? (
            <button onClick={(e) => e.preventDefault()}>
              <FaPen />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardDashbaord;
