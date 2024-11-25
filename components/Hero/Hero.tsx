import Image from "next/image";
import classes from "./hero.module.scss";
import Link from "next/link";
const Hero = () => {
  return (
    <header className={classes.hero}>
      <Image
        width={2000}
        height={1400}
        alt="Hero"
        src="https://images.unsplash.com/photo-1510629326852-3f0946701bc6?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className={classes.subtitles}>
        <h1>Your new Home</h1>
        <p>Various of places to pick from. Find your new home now!</p>
      </div>
      <div className={classes.buttons}>
        <Link href="/shop" className="basicbutton">
          Shop Now
        </Link>
        <Link href="/shop/sale" className={"basicbutton " + classes.button}>
          Ongoing Sale
        </Link>
      </div>
    </header>
  );
};

export default Hero;
