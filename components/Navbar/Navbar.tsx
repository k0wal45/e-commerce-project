"use client";
import Image from "next/image";
import classes from "./navbar.module.scss";
import { FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import Sale from "./Sale/Sale";

const Navbar = () => {
  const hamburger = useRef<HTMLInputElement>(null);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(false);
  const [onTop, setOnTop] = useState(true);
  const [adOff, setAdOff] = useState(false);

  useEffect(() => {
    if (adOff) {
      setHidden(true);
    }
  }, [adOff]);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous = scrollY.getPrevious() as number;
    if (!adOff) {
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }

    if (latest > 100) {
      setOnTop(false);
    } else {
      setOnTop(true);
    }
  });

  const handleLinkClick = () => {
    setVisible(false);
    if (hamburger.current) {
      hamburger.current.checked = false;
    }
  };

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-1.7rem" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={classes.sale}
    >
      <Sale setAdOff={setAdOff} />
      <motion.nav className={classes.navbar}>
        <div>
          <Image width={50} height={25} alt="H" src="/img/logoHE.svg" />
        </div>

        <ul className={classes.desktop}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Shop</Link>
          </li>
          <li>
            <Link href="/">Sale</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>

        <ul className={classes.desktop}>
          <li>
            <FaMagnifyingGlass />
          </li>
          <li>
            <FaHeart />
          </li>
        </ul>
        <label>
          <input
            ref={hamburger}
            type="checkbox"
            id="check"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              e.target.checked ? setVisible(true) : setVisible(false);
            }}
            className="hidden"
          />
          <span></span>
          <span></span>
          <span></span>
        </label>

        <motion.ul
          variants={{
            hide: {
              translateX: "100%",
            },
            show: {
              translateX: 0,
            },
          }}
          animate={visible ? "show" : "hide"}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className={classes.mobile}
        >
          <li onClick={handleLinkClick}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/">Shop</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/">Sale</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/">About</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/">Contact</Link>
          </li>
        </motion.ul>
      </motion.nav>
    </motion.div>
  );
};

export default Navbar;
