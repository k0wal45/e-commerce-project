"use client";
import Image from "next/image";
import classes from "./images.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Fragment, useState } from "react";

function copyAndTrimArray(arr) {
  // Create a copy of the array
  let newArr = [...arr];

  // Remove all elements after the 5th item
  newArr.length = Math.min(newArr.length, 5);

  return newArr;
}

const Images = ({ images }: { images: string[] | File[] }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const imagesToDisplay = copyAndTrimArray(images);

  return (
    <Fragment>
      <div className={classes.container}>
        {
          //display only 5 images from whole array
          imagesToDisplay.map((image, i) => (
            <Image key={i} width={800} height={700} src={image} alt="product" />
          ))
        }
      </div>
      {/* pagination */}
      <div className={classes.pagination}>
        <button
          onClick={() => setCurrentImage(currentImage - 1)}
          disabled={currentImage === 0}
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => setCurrentImage(currentImage + 1)}
          disabled={currentImage === images.length - 1}
        >
          <FaArrowRight />
        </button>
      </div>
    </Fragment>
  );
};

export default Images;
