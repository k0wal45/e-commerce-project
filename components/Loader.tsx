import { Variants, motion } from "framer-motion";

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.7,
      ease: "circIn",
    },
  },
} as Variants;

const Loader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      style={{ display: "flex", gap: "4px" }}
    >
      <motion.div
        variants={variants}
        style={{ height: "2rem", width: "8px", background: "#333" }}
      />
      <motion.div
        variants={variants}
        style={{ height: "2rem", width: "8px", background: "#333" }}
      />
      <motion.div
        variants={variants}
        style={{ height: "2rem", width: "8px", background: "#333" }}
      />
      <motion.div
        variants={variants}
        style={{ height: "2rem", width: "8px", background: "#333" }}
      />
      <motion.div
        variants={variants}
        style={{ height: "2rem", width: "8px", background: "#333" }}
      />
    </motion.div>
  );
};

export default Loader;
