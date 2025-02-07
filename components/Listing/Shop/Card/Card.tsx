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
      href={`/shop/item/${listing.category}/${listing._id}`}
      className={classes.card}
    >
      <div className={classes.imageBox}>
        <Image
          width={700}
          height={700}
          alt=""
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className={classes.content}>
        <span className={classes.price}>
          <p>{"$" + costString(12345678)}</p>
        </span>
        <p>
          <span>
            <FaLocationDot />
          </span>
          Somewhere
        </p>
        <p>
          <span>
            <BiArea />
          </span>
          25 m<sup>2</sup>
        </p>
        <p>
          <span>
            <FaHouse />
          </span>
          Big House
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
