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
        src="/img/tableInaRoom.jpeg"
      />
      <div className={classes.subtitles}>
        <h1>Your workspace Reinvented</h1>
        <p>
          Modern design, peak funcionality tailored to your individual needs
        </p>
      </div>
      <div className={classes.buttons}>
        <Link href="/" className="basicbutton">
          Shop Now
        </Link>
        <Link href="/" className={"basicbutton " + classes.button}>
          Ongoing Sale
        </Link>
      </div>
    </header>
  );
};

export default Hero;
