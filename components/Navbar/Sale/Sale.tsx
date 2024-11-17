"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./sale.module.scss";

const Sale = () => {
  return (
    <div className={styles["ribbon-wrapper"]}>
      <TranslateWrapper reverse>
        <LogoItemsBottom />
      </TranslateWrapper>
      <TranslateWrapper reverse>
        <LogoItemsBottom />
      </TranslateWrapper>
      <TranslateWrapper reverse>
        <LogoItemsBottom />
      </TranslateWrapper>
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
      className={styles["translate-wrapper"]}
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
