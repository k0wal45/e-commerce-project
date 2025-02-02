"use client";
import { Listing } from "@/utils/Types";
import { useState } from "react";

const TestForm = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<Listing>({
    title: "name",
    description: "desc",
    price: 1000000,
    category: "houses",
    location: {
      address: "add",
      city: "cit",
      state: "state",
      zipCode: "123-123",
      country: "Poland",
    },
    imageUrls: [],
    features: {
      bedrooms: 1,
      bathrooms: 2,
      area: 3,
      parkingSpaces: 4,
      hasPool: true,
      hasGarage: false,
      hasGarden: false,
    },
    seller: {
      name: "name",
      email: "ea@mail",
      phone: "123",
    },
    status: "available",
    promotion: {
      isActive: true,
      discountType: "fixed",
      discountValue: 1200,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Handles input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const booleanValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setFormData({
      ...formData,
      [name]: booleanValue,
    });
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: string
  ) => {
    const { name, value, type } = e.target;
    const booleanValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof formData] as object),
        [name]: booleanValue,
      },
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(true);
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
    setLoading(false);
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
        throw new Error("Failed to submit image");
      }

      // Parse the JSON response
      const responseData = await request.json();

      // Handle success (you can access responseData here)
      if (responseData.success) {
        setImages(responseData.images);
      } else {
        alert("Error adding images: " + responseData.error);
        setLoading(false);

        return;
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting the images.");
      setLoading(false);

      return;
    }
    const dataToSend = {
      ...formData,
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
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "2rem 0",
        border: "1px solid #ccc",
        padding: "1rem",
        width: "fit-content",
      }}
    >
      <h2>Add New Listing</h2>

      <label>
        Title:{" "}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:{" "}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:{" "}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="houses">Houses</option>
          <option value="apartments">Apartments</option>
          <option value="studios">Studios</option>
          <option value="investments">Investments</option>
          <option value="rooms">Rooms</option>
          <option value="plots">Plots</option>
          <option value="commercial_units">Commercial Units</option>
          <option value="warehouses">Warehouses</option>
          <option value="garages">Garages</option>
        </select>
      </label>

      <h3>Location</h3>
      <label>
        Address:{" "}
        <input
          type="text"
          name="address"
          value={formData.location.address}
          onChange={(e) => handleNestedChange(e, "location")}
          required
        />
      </label>
      <label>
        City:{" "}
        <input
          type="text"
          name="city"
          value={formData.location.city}
          onChange={(e) => handleNestedChange(e, "location")}
          required
        />
      </label>
      <label>
        State:{" "}
        <input
          type="text"
          name="state"
          value={formData.location.state}
          onChange={(e) => handleNestedChange(e, "location")}
          required
        />
      </label>
      <label>
        Zip Code:{" "}
        <input
          type="text"
          name="zipCode"
          value={formData.location.zipCode}
          onChange={(e) => handleNestedChange(e, "location")}
          required
        />
      </label>
      <label>
        Country:{" "}
        <input
          type="text"
          name="country"
          value={formData.location.country}
          onChange={(e) => handleNestedChange(e, "location")}
          required
        />
      </label>

      <h3>Features</h3>
      <label>
        Area:{" "}
        <input
          type="number"
          name="area"
          value={formData.features.area}
          onChange={(e) => handleNestedChange(e, "features")}
        />
      </label>
      <label>
        Bedrooms:{" "}
        <input
          type="number"
          name="bedrooms"
          value={formData.features.bedrooms}
          onChange={(e) => handleNestedChange(e, "features")}
        />
      </label>
      <label>
        Bathrooms:{" "}
        <input
          type="number"
          name="bathrooms"
          value={formData.features.bathrooms}
          onChange={(e) => handleNestedChange(e, "features")}
        />
      </label>
      <label>
        Parking Spaces:{" "}
        <input
          type="number"
          name="parkingSpaces"
          value={formData.features.parkingSpaces}
          onChange={(e) => handleNestedChange(e, "features")}
        />
      </label>
      <label>
        Has Pool:{" "}
        <input
          type="checkbox"
          name="hasPool"
          checked={formData.features.hasPool}
          onChange={(e) => handleNestedChange(e, "features")}
        />
      </label>
      <label>
        Has Garage:{" "}
        <input
          type="checkbox"
          name="hasGarage"
          checked={formData.features.hasGarage}
          onChange={(e) => handleNestedChange(e, "features")}
        />
      </label>
      <label>
        Has Garden:{" "}
        <input
          type="checkbox"
          name="hasGarden"
          checked={formData.features.hasGarden}
          onChange={(e) => handleNestedChange(e, "features")}
        />
      </label>

      <h3>Seller</h3>
      <label>
        Name:{" "}
        <input
          type="text"
          name="name"
          value={formData.seller.name}
          onChange={(e) => handleNestedChange(e, "seller")}
          required
        />
      </label>
      <label>
        Email:{" "}
        <input
          type="email"
          name="email"
          value={formData.seller.email}
          onChange={(e) => handleNestedChange(e, "seller")}
          required
        />
      </label>
      <label>
        Phone:{" "}
        <input
          type="number"
          name="phone"
          value={formData.seller.phone}
          onChange={(e) => handleNestedChange(e, "seller")}
          required
        />
      </label>

      <h3>Promotion</h3>
      <label>
        Active:{" "}
        <input
          type="checkbox"
          name="isActive"
          checked={formData.promotion.isActive}
          onChange={(e) => handleNestedChange(e, "promotion")}
        />
      </label>
      <label>
        Discount Type:
        <select
          name="discountType"
          value={formData.promotion.discountType}
          onChange={(e) => handleNestedChange(e, "promotion")}
        >
          <option value="">None</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
      </label>
      <label>
        Discount Value:{" "}
        <input
          type="number"
          name="discountValue"
          value={formData.promotion.discountValue}
          onChange={(e) => handleNestedChange(e, "promotion")}
        />
      </label>

      <h3>Images</h3>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />

      <button type="submit">{loading ? "Loading..." : "Submit"}</button>
    </form>
  );
};

export default TestForm;
