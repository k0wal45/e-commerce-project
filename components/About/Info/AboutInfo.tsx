import Image from "next/image";
import classes from "./AboutInfo.module.scss";
const AboutInfo = ({
  title,
  text,
  img,
}: {
  title: string;
  text: string;
  img: string;
}) => {
  return (
    <section className={classes.about}>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Image width={600} height={800} src={img} alt="" />
    </section>
  );
};

export default AboutInfo;
