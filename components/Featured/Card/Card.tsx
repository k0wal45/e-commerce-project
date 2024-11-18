import Image from "next/image";
import classes from "./card.module.scss";
import { FaShoppingCart } from "react-icons/fa";

const Card = () => {
  return (
    <li className={classes.card}>
      <Image
        width={700}
        height={700}
        alt=""
        src="/img/products/oakwoodDesk.png"
      />
      <div className={classes.pricing}>
        <div className={classes.subtitles}>
          <p>Standing Desk</p>
          <p>$900</p>
        </div>
        <button>
          <FaShoppingCart />
        </button>
      </div>
    </li>
  );
};

export default Card;
