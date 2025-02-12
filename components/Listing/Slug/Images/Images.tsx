import Image from "next/image";
import classes from "./images.module.scss";
import { FaArrowRight } from "react-icons/fa6";
import { BsArrowLeft } from "react-icons/bs";

const Images = ({ images }: { images: string[] }) => {
  return (
    <div className={classes.container}>
      {images.map((image, index) => (
        <Image width={800} height={700} key={index} src={image} alt="product" />
      ))}

      {/* pagination */}
      <div className={classes.pagination}>
        <button>
          <BsArrowLeft />
        </button>
        <button>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Images;
