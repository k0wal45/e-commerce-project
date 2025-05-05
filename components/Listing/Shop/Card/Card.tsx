"use client";
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
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const costString = (cost: number) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Card = ({ listing }: { listing: Listing }) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [token, setToken] = useState<boolean>(false);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");

    if (favorites) {
      const favoritesArray = JSON.parse(favorites);
      setFavorite(favoritesArray.includes(listing._id));
    }

    checkToken();
  }, [listing._id]);

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const favortites = localStorage.getItem("favorites");

    if (favortites) {
      const favoritesArray = JSON.parse(favortites);

      if (favoritesArray.includes(listing._id)) {
        favoritesArray.splice(favoritesArray.indexOf(listing._id), 1);
        localStorage.setItem("favorites", JSON.stringify(favoritesArray));
        setFavorite(false);
      } else {
        favoritesArray.push(listing._id);
        localStorage.setItem("favorites", JSON.stringify(favoritesArray));
        setFavorite(true);
      }
    } else {
      localStorage.setItem("favorites", JSON.stringify([listing._id]));
      setFavorite(true);
    }
  };

  const checkToken = async () => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded); // Shows userId, role, etc.
    }

    if (token) {
      setToken(true);
      return;
    }

    if (!token) {
      setToken(false);
      return;
    }
  };

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
          <button onClick={handleFavorite}>
            <FaHeart
              style={{
                color: favorite ? "#ff5555" : "black",
              }}
            />
          </button>

          {token ? (
            <button>
              <Link href={`/dashboard/listings/edit?id=${listing._id}`}>
                <FaPen />
              </Link>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
