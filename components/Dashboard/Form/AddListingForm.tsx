"use client";
import { useState } from "react";
import classes from "./form.module.scss";
import { Listing } from "@/utils/Types";
import fs from "node:fs";

type Filename = string;
type ImageType = "png" | "jpg" | "jpeg" | "webp";
type Base64String = `data:image/${ImageType};base64,${string}`;

const AddListingForm = () => {
  const [formData, setFormData] = useState<Listing>({
    id: "toSet",
    type: "",
    name: "",
    location: "",
    discountedPrice: undefined,
    regularPrice: 0,
    area: 0,
    imageUrls: [], // Tablica plików
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); // Konwertuj FileList na tablicę
      setFormData({ ...formData, imageUrls: files });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    formData.imageUrls.forEach((img) => {
      const convertImageToBase64URL = (
        filename: Filename,
        imageType: ImageType = "png"
      ): Base64String => {
        try {
          const buffer = fs.readFileSync(filename);
          const base64String = Buffer.from(buffer).toString("base64");
          // console.log(`base64String`, base64String.slice(0, 100));
          return `data:image/${imageType};base64,${base64String}`;
        } catch (error) {
          throw new Error(`file ${filename} no exist, error: ${error}`);
        }
      };
      // test cases
      const ok = convertImageToBase64URL("./public/test.png");
    });

    try {
      const request = await fetch("/api/getData/addListing", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!request.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Listing added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting the listing. aaa");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h2>Add New Listing</h2>

      <div className={classes["form-group"]}>
        <div className={classes["form-select"]}>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select the type
            </option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
          </select>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter the name"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter the location"
          required
        />
      </div>

      <div>
        <label htmlFor="regularPrice">Regular Price</label>
        <input
          type="number"
          id="regularPrice"
          name="regularPrice"
          value={formData.regularPrice}
          onChange={handleChange}
          placeholder="Enter the regular price"
          required
        />
      </div>

      <div>
        <label htmlFor="discountedPrice">Discounted Price</label>
        <input
          type="number"
          id="discountedPrice"
          name="discountedPrice"
          value={formData.discountedPrice}
          onChange={handleChange}
          placeholder="Enter the discounted price (if applicable)"
        />
      </div>

      <div>
        <label htmlFor="area">Area (m²)</label>
        <input
          type="number"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Enter the area in m²"
          required
        />
      </div>
      <div>
        <label htmlFor="imageUrls">Images</label>
        <input
          type="file"
          id="imageUrls"
          name="imageUrls"
          multiple
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>

      <button type="submit">Add Listing</button>
    </form>
  );
};

export default AddListingForm;
