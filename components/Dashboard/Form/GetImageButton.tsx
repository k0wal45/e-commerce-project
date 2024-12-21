"use client";
import Image from "next/image";
import React, { useState } from "react";

const GetImageButton: React.FC = () => {
  const [data, setData] = useState({});
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
    // getting data
    try {
      const response = await fetch(`/api/getData/getListing`);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setData(data);
      } else {
        console.error("Error fetching images:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // getting images from data
    try {
      const imageKeys = [
        "uploads/1734775571513-0.jpeg",
        "uploads/1734775571981-1.png",
      ];
      const queryParams = imageKeys
        .map((key) => `imageKeys=${encodeURIComponent(key)}`)
        .join("&");
      const response = await fetch(
        `/api/getData/getListing/getImage?${queryParams}`
      );
      const data = await response.json();
      console.log(data);
      // if (data.success) {
      //   setDa(data.images);
      // } else {
      //   console.error("Error fetching images:", data.error);
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchImages}>Fetch Images</button>
      <div>
        {images.map((image, index) => (
          <Image
            width={700}
            height={700}
            key={index}
            src={image}
            alt={`Fetched ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GetImageButton;
