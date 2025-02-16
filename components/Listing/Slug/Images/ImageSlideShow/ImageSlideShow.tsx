"use client";
import classes from "./ImageSlideShow.module.scss";
import { FaArrowLeft, FaArrowRight, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { useEffect } from "react";

const ImageSlideShow = ({
  images,
  show,
  toggle,
  currentImage,
  setCurrentImage,
}: {
  images: string[] | File[];
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  currentImage: number;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggle(false);
      }
      if (event.key === "ArrowRight" && currentImage < images.length - 1) {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }
      if (event.key === "ArrowLeft" && currentImage > 0) {
        setCurrentImage((prev) => (prev - 1) % images.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggle, currentImage, images.length, setCurrentImage]);
  return (
    <div
      className={classes.slideShow}
      style={{ display: show ? "flex" : "none" }}
    >
      <Image
        width={1200}
        height={800}
        src={
          typeof images[currentImage] === "string"
            ? images[currentImage]
            : URL.createObjectURL(images[currentImage] as File)
        }
        alt="product"
        className={classes.Image}
      />
      <div className={classes.allImages}>
        {images.map((img: string | File, index: number) => (
          <Image
            key={index}
            width={300}
            height={200}
            src={typeof img === "string" ? img : URL.createObjectURL(img)}
            alt="product"
            style={{
              border: index === currentImage ? "solid 2px #333" : "none",
            }}
          />
        ))}
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

      {/* close button */}
      <button className={classes.closeButton} onClick={() => toggle(false)}>
        <FaXmark />
      </button>
    </div>
  );
};

export default ImageSlideShow;
