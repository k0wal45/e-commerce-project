"use client";
import React from "react";
import { motion } from "framer-motion";
import classes from "./sale.module.scss";
import { FaXmark } from "react-icons/fa6";

// Sale.tsx
type SaleProps = {
  setAdOff: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sale: React.FC<SaleProps> = ({ setAdOff }) => {
  return (
    <div className={classes.ribbonWrapper}>
      <TranslateWrapper reverse>
        <LogoItemsBottom />
      </TranslateWrapper>
      <TranslateWrapper reverse>
        <LogoItemsBottom />
      </TranslateWrapper>
      <TranslateWrapper reverse>
        <LogoItemsBottom />
      </TranslateWrapper>
      <div className={classes.overlay}>
        <button onClick={() => setAdOff(true)}>
          <FaXmark />
        </button>
      </div>
    </div>
  );
};

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: JSX.Element;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      className={classes.translateWrapper}
    >
      {children}
    </motion.div>
  );
};

const LogoItemsBottom = () => (
  <>
    {promotionTitles.map((sale) => (
      <div key={sale}>
        <p>{sale}</p>
      </div>
    ))}
  </>
);

export default Sale;

const promotionTitles = [
  "Exclusive: 20% Off Listing Fees for Apartments",
  "Limited Time: Free Home Valuation Service",
  "Hot Deal: 10% Off Commission on Luxury Villas",
  "Special Offer: List Your Rental for Free for 30 Days",
  "Save Big: 15% Off Mortgage Assistance Services",
  "Summer Sale: Reduced Prices on Waterfront Properties",
  "Limited Offer: Discounted Rates for First-Time Sellers",
  "Exclusive: Free Photography Package for New Listings",
  "Hot Deal: Advertise Your Property with Premium Visibility at Half Price",
  "Special Offer: Get a Free Real Estate Agent Consultation",
];
