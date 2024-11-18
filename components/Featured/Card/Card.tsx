import Image from "next/image";
import classes from "./card.module.scss";
import { FaHouse, FaLocationDot } from "react-icons/fa6";
import { BiArea } from "react-icons/bi";

const costString = (cost: number) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Card = () => {
  return (
    <li className={classes.card}>
      <div className={classes.imageBox}>
        <Image
          width={700}
          height={700}
          alt=""
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className={classes.content}>
        <span className={classes.price}>
          <p>{"$" + costString(12345678)}</p>
        </span>
        <p>
          <FaLocationDot />
          <span>Somewehre</span>
        </p>
        <p>
          <BiArea />
          <span>
            25 m <sup>2</sup>
          </span>
        </p>
        <p>
          <FaHouse />
          <span>Big House</span>
        </p>
      </div>
    </li>
  );
};

export default Card;
