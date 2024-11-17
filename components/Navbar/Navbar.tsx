import Image from "next/image";
import classes from "./navbar.module.scss";
import { FaMagnifyingGlass, FaPerson } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <Image width={50} height={25} alt="H" src="/img/logoHE.svg" />
      <ul>
        <li>Strona Główna</li>
        <li>Sklep</li>
        <li>Promocje</li>
        <li>O Nas</li>
        <li>Kontakt</li>
      </ul>

      <ul>
        <li>
          <FaMagnifyingGlass />
        </li>
        <li>
          <FaPerson />
        </li>
        <li>
          <FaShoppingCart />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
