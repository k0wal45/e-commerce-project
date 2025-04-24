"use client";
import Image from "next/image";
import classes from "./navbar.module.scss";
import { FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import Sale from "./Sale/Sale";
import { IoIosStats } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Navbar = () => {
  const hamburger = useRef<HTMLInputElement>(null);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(false);
  const [adOff, setAdOff] = useState(false);
  const [token, setToken] = useState<boolean>(false);

  useEffect(() => {
    if (adOff) {
      setHidden(true);
    }
    checkToken();
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
  });

  const handleLinkClick = () => {
    setVisible(false);
    if (hamburger.current) {
      hamburger.current.checked = false;
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
        <Link href="/">
          <Image width={50} height={25} alt="H" src="/img/logoHE.svg" />
        </Link>

        <ul className={classes.desktop}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/shop/sale">Sale</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <ul className={classes.desktop}>
          <li>
            <FaMagnifyingGlass />
          </li>
          <li>
            <FaHeart />
            {localStorage.getItem("favorites") !== null ? (
              <span className={classes.favorites}>
                {JSON.parse(localStorage.getItem("favorites")!).length}
              </span>
            ) : (
              ""
            )}
          </li>
          {token && (
            <li>
              <Link href="/dashboard">
                <IoIosStats />
              </Link>
            </li>
          )}
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
            <Link href="/shop">Shop</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/shop/sale">Sale</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/about">About</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/contact">Contact</Link>
          </li>
        </motion.ul>
      </motion.nav>
    </motion.div>
  );
};

export default Navbar;
