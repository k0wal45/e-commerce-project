"use client";
import { useState } from "react";
import classes from "./form.module.scss";
import { Listing } from "@/utils/Types";

const AddListingForm = () => {
  const [formData, setFormData] = useState<Listing>({
    type: "",
    name: "",
    location: "",
    discountedPrice: undefined,
    regularPrice: 0,
    area: 0,
    imageUrls: [], // Tablica plików
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); // Convert FileList to an array

      // Filter only valid File objects
      const validFiles = files.filter((file) => file instanceof File);

      try {
        // Convert valid files to Base64
        const base64Images = await Promise.all(
          validFiles.map((file) => convertToBase64(file))
        );

        // Update the form data with Base64 strings
        setFormData({ ...formData, imageUrls: base64Images });
      } catch (error) {
        console.error("Error during file processing:", error);
      }
    }
  };

  // Helper function to convert a file to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // Resolve with Base64 string
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Read file as Base64
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // storing image handling
    try {
      const request = await fetch("/api/getData/addListing/addImage", {
        method: "POST",
        body: JSON.stringify(formData.imageUrls),
      });

      if (!request.ok) {
        throw new Error("Failed to submit form");
      }

      // Parse the JSON response
      const responseData = await request.json();

      // Handle success (you can access responseData here)
      if (responseData.success) {
        alert("Listing added successfully!");
        setImages(responseData.images);
        console.log(responseData.images);
      } else {
        alert("Error adding listing: " + responseData.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting the listing.");
    }

    // creating data object to send to the api

    const dataToSend = {
      type: formData.type,
      name: formData.name,
      location: formData.location,
      regularPrice: formData.regularPrice,
      discountedPrice: formData.discountedPrice,
      area: formData.area,
      imageUrls: images,
    };

    // storing data handling
    try {
      const request = await fetch("/api/getData/addListing", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      });

      if (!request.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Listing added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting the listing.");
    }

    setLoading(false);
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

      <button type="submit">
        {loading ? "Adding Listing..." : "Add Listing"}
      </button>
    </form>
  );
};

export default AddListingForm;
