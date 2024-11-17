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
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
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
  "50% Off Sofas",
  "Buy 1 Get 1 Free Chairs",
  "Exclusive Deal: 30% Off Dining Tables",
  "Clearance Sale: Up to 70% Off Wardrobes",
  "Limited Offer: Free Shipping on Beds",
];
