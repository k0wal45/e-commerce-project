"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import classes from "./page.module.scss";
import { Listing } from "@/utils/Types";
import Images from "@/components/Listing/Slug/Images/Images";
import { FaAngleLeft, FaHeart, FaLocationDot, FaShare } from "react-icons/fa6";
import Features from "@/components/Listing/Slug/Features/Features";
import SimpleContactForm from "@/components/Listing/Slug/Form/Form";
import { toast, ToastContainer } from "react-toastify";
const copyUrlToClipboard = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      toast.success("Messages sent succesfuly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

const putSymbolEveryThreeDigit = (number: number, symbol: string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
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
        <button onClick={() => history.back()}>
          <FaAngleLeft style={{ fontSize: "1.6rem" }} />
          <p>Back</p>
        </button>

        <div>
          <button onClick={copyUrlToClipboard}>
            <FaShare style={{ fontSize: "1.6rem" }} />
            <p>Share</p>
          </button>
          <button onClick={() => alert("Succesfuly saved")}>
            <FaHeart style={{ fontSize: "1.6rem" }} />
            <p>Save</p>
          </button>
        </div>
      </div>
      <Images images={listing.images} />
      <div className={classes.mainInfo}>
        <h1>{listing.title}</h1>
        <div className={classes.container}>
          <p className={classes.price}>
            ${putSymbolEveryThreeDigit(listing.price, " ")}
          </p>
          <span>
            {putSymbolEveryThreeDigit(
              listing.features.area
                ? Math.round(listing.price / listing.features.area)
                : 0,
              " "
            )}{" "}
            $/m
            <sup>2</sup>
          </span>
        </div>
        <div className={classes.address}>
          <FaLocationDot />
          <p>
            <b>
              {listing.location.address}, {listing.location.city},{" "}
              {listing.location.state}, {listing.location.country}
            </b>
          </p>
        </div>
      </div>
      <Features features={listing.features} />
      <div className={classes.mainInfo}>
        <h3>Description</h3>
        <p>{listing.description}</p>
      </div>
      <div className={classes.seller} id="seller">
        <div className={classes.container}>
          <h4>Seller Info</h4>
          {listing.seller.name ? (
            <div>
              <p>Name: </p>
              <p>{listing.seller.name}</p>
            </div>
          ) : (
            ""
          )}
          {listing.seller.phone ? (
            <div>
              <p>Phone: </p>
              <p>
                {typeof listing.seller.phone === "string"
                  ? listing.seller.phone.startsWith("+")
                    ? listing.seller.phone
                    : "+" +
                      listing.seller.phone.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        "($1) $2-$3"
                      )
                  : listing.seller.phone
                      .toString()
                      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </p>
            </div>
          ) : (
            ""
          )}
          {listing.seller.email ? (
            <div>
              <p>E-mail: </p>
              <p>{listing.seller.email}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={classes.container}>
          <SimpleContactForm />
        </div>
      </div>
      <ToastContainer />
    </article>
  );
};

export default Page;
