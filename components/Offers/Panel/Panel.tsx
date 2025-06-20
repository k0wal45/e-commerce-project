"use client";
import Image from "next/image";
import classes from "./panel.module.scss";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const Panel = ({
  image,
  title,
  link,
}: {
  image: string;
  title: string;
  link: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 765);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={isMobile ? "animate" : "initial"}
      animate={isMobile ? "animate" : undefined}
      whileHover={isMobile ? undefined : "animate"}
      className={classes.panel}
    >
      <Image width={700} height={700} alt="house" src={image} />
      <motion.p
        variants={{
          initial: {
            color: "rgb(0,0,0)",
            translateY: 0,
          },
          animate: {
            color: "rgb(255,255,255)",
            translateY: "-4rem",
          },
        }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.p>
      <motion.div
        variants={{
          initial: {
            translateY: "100%",
          },
          animate: {
            translateY: 0,
          },
        }}
        transition={{ duration: 0.5 }}
        className={classes.content}
      >
        <Link href={"/shop?category=" + link}>
          <motion.button
            variants={{
              initial: {
                height: "0px",
                scaleY: 0,
              },
              animate: {
                height: "fit-content",
                scaleY: 1,
              },
            }}
            transition={{ duration: 0.3 }}
          >
            Find it yourself
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Panel;
