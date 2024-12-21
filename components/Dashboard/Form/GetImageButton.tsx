"use client";
import Image from "next/image";
import React, { useState } from "react";

const GetImageButton: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
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
      if (data.success) {
        setImages(data.images);
      } else {
        console.error("Error fetching images:", data.error);
      }
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
