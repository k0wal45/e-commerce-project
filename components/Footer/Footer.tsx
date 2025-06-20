import Link from "next/link";
import classes from "./footer.module.scss";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <ul>
        <li>Service</li>
        <li>
          <Link href="/legal-notice">Legal Notice</Link>
        </li>
        <li>
          <Link href="/data-protection">Data Protection</Link>
        </li>
      </ul>

      <ul>
        <li>Our listings</li>
        <li>
          <Link href="/shop?category=warehouses">Warehouses</Link>
        </li>
        <li>
          <Link href="/shop?category=houses">Houses</Link>
        </li>
      </ul>

      <div>
        <Image width={300} height={300} alt="" src="/img/logoHE.svg" />
        <p>HouseE</p>
      </div>

      <ul>
        <li>Connect</li>
        <li>
          <Link href="https://daniel-kowalski.com/">Instagram</Link>
        </li>
        <li>
          <Link href="https://daniel-kowalski.com/">Facebook</Link>
        </li>
      </ul>

      <ul>
        <li>Inquiries</li>
        <li>
          <Link href="https://www.lunarisweb.pl/">press@housee.com</Link>
        </li>
        <li>
          <Link href="https://www.lunarisweb.pl/">sales@housee.pl</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
