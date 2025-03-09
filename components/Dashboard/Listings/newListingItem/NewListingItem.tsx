import Image from "next/image";
import classes from "./newListingItem.module.scss";

const NewListingItem = ({
  title,
  price,
  image,
}: {
  title: string;
  price: string | number;
  image: string;
}) => {
  return (
    <div className={classes.listing}>
      <Image src={image} alt="House" width={200} height={200} />

      <div>
        <h3>{title}</h3>
        <p>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
      </div>
    </div>
  );
};

export default NewListingItem;
