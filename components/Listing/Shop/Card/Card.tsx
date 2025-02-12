import Image from "next/image";
import classes from "./card.module.scss";
import { FaHeart, FaHouse, FaLocationDot, FaPhone } from "react-icons/fa6";
import { BiArea } from "react-icons/bi";
import Link from "next/link";
import { Listing } from "@/utils/Types";

const costString = (cost: number) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Card = ({ listing }: { listing: Listing }) => {
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
        <p>
          <span>
            <FaLocationDot />
          </span>
          {listing.location.city}, {listing.location.state}
        </p>
        <p>
          <span>
            <BiArea />
          </span>
          {listing.features.area} m<sup>2</sup>
        </p>
        <p>
          <span>
            <FaHouse />
          </span>
          {listing.category}
        </p>

        <div className={classes.buttons}>
          <button>
            <FaPhone />
          </button>
          <button>
            <FaHeart />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
