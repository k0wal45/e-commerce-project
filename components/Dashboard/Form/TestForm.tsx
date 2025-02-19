"use client";
import { Listing } from "@/utils/Types";
import { useState } from "react";
import classes from "./form.module.scss";

const TestForm = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<Listing>({
    title: "",
    description: "",
    price: 0,
    category: "houses",
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    },
    images: [],
    features: {
      area: 0,
      parkingSpaces: 0,
      bathrooms: 0,
      bedrooms: 0,
      hasGarden: false,
      hasPool: false,
      hasGarage: false,
    },
    seller: {
      name: "",
      email: "",
      phone: "",
    },
    promotion: {
      isActive: false,
      discountType: "",
      discountValue: 0,
    },
    status: "available",
    createdAt: new Date().toISOString(),
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = new FormData();

    // Dodaj pliki do FormData

    images.forEach((file) => {
      dataToSend.append("images", file);
    });

    // Dodaj pozostałe dane formularza
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("price", formData.price.toString());
    dataToSend.append("category", formData.category);
    dataToSend.append("location", JSON.stringify(formData.location));
    dataToSend.append("features", JSON.stringify(formData.features));
    dataToSend.append("seller", JSON.stringify(formData.seller));
    dataToSend.append("promotion", JSON.stringify(formData.promotion));
    dataToSend.append("createdAt", JSON.stringify(formData.createdAt));

    try {
      // Prześlij pliki i dane do API
      const response = await fetch("/api/addListing", {
        method: "POST",
        body: dataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Listing added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting the listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.form}
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
