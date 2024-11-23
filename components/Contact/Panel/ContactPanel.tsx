import Image from "next/image";
import classes from "./contactpanel.module.scss";
import Link from "next/link";

const ContactPanel = () => {
  return (
    <section className={classes.panel}>
      <Image
        width={1920}
        height={1080}
        alt=""
        src="https://images.unsplash.com/photo-1719773745404-d2e57e1af9bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <h4>Contact Us</h4>
      <p>If you didn&apos;t find anything that suits you. Hit us up!</p>
      <Link href="/contact">
        <button className="basicbutton">Click Here</button>
      </Link>
    </section>
  );
};

export default ContactPanel;
