"use client";
import Image from "next/image";
import classes from "./navigation.module.scss";
import { FaAngleLeft, FaHouse, FaList } from "react-icons/fa6";
import Link from "next/link";
// import { RiMegaphoneFill } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <motion.nav
      initial={{ width: "100%" }}
      animate={
        isHidden
          ? { width: "100%", padding: "1rem 2rem 1rem 0" }
          : { width: "0px", padding: "0" }
      }
      transition={{ duration: 1 }}
      className={classes.navigation}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, translateX: "-100ppx" },
          visible: { opacity: 1, translateX: "0" },
        }}
        initial="hidden"
        transition={{ duration: 0.3 }}
        animate={isHidden ? "visible" : "hidden"}
      >
        <Link href="/dashboard" className={classes.logo}>
          <Image width={200} height={100} alt="" src="/img/logoHE.svg" />
          <p>HouseE</p>
        </Link>
      </motion.div>
      <motion.ul
        variants={{
          hidden: { opacity: 0, translateX: "-100ppx" },
          visible: { opacity: 1, translateX: "0" },
        }}
        initial="hidden"
        animate={isHidden ? "visible" : "hidden"}
        transition={{ duration: 0.3 }}
      >
        <li>
          <Link href="/dashboard">
            <FaHouse />
            <p>Main Menu</p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/listings">
            <FaList />
            <p>Listings</p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/messages">
            <MdMessage />
            <p>Messages</p>
          </Link>
        </li>
        {/* <li>
          <Link href="/dashboard/promotions">
            <RiMegaphoneFill />
            <p>Promotions</p>
          </Link>
        </li> */}
      </motion.ul>

      <motion.div
        variants={{
          hidden: { opacity: 0, translateX: "-100ppx" },
          visible: { opacity: 1, translateX: "0" },
        }}
        initial="hidden"
        transition={{ duration: 0.3 }}
        animate={isHidden ? "visible" : "hidden"}
        className={classes.backToMain}
      >
        <Link href="/">
          <FaAngleLeft />
          <p>Main site</p>
        </Link>
      </motion.div>

      <button
        className={classes.hideButton}
        onClick={() => setIsHidden(!isHidden)}
      >
        <FaAngleLeft style={{ rotate: isHidden ? "0deg" : "-180deg" }} />
      </button>
    </motion.nav>
  );
};

export default Navigation;
