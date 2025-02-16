"use client";
import Image from "next/image";
import classes from "./images.module.scss";
import ImageSlideShow from "./ImageSlideShow/ImageSlideShow";
import { useState } from "react";

function copyAndTrimArray(arr: string[] | File[]) {
  // Create a copy of the array
  const newArr = [...arr];

  // Remove all elements after the 5th item
  newArr.length = Math.min(newArr.length, 5);

  return newArr;
}

const Images = ({ images }: { images: string[] | File[] }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [showSlideShow, setShowSlideShow] = useState<boolean>(false);
  const imagesToDisplay = copyAndTrimArray(images).filter(
    (image) => typeof image === "string"
  ) as string[];

  return (
    <div className={classes.container}>
      {
        //display only 5 images from whole array
        imagesToDisplay.map((image, i) => (
          <Image
            key={i}
            width={800}
            height={700}
            src={image}
            alt="product"
            onClick={() => {
              setCurrentImage(i);
              setShowSlideShow(true);
            }}
          />
        ))
      }
      {
        <ImageSlideShow
          images={images}
          show={showSlideShow}
          toggle={setShowSlideShow}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
      }
    </div>
  );
};

export default Images;
