import Image from "next/image";
import classes from "./universalHero.module.scss";

const UniversalHero = ({ title, image }: { title: string; image: string }) => {
  return (
    <header className={classes.hero}>
      <Image width={1700} height={900} alt={title} src={image} />
      <h1>{title}</h1>
    </header>
  );
};

export default UniversalHero;
