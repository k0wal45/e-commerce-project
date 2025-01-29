"use client";
import { useState } from "react";

const TestForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    currency: "USD",
    category: "houses",
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
    images: [],
    features: {
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      yearBuilt: 0,
      parkingSpaces: 0,
      hasPool: false,
      hasGarage: false,
      hasGarden: false,
    },
    seller: {
      name: "",
      email: "",
      phone: "",
      verified: false,
    },
    status: "available",
    promotion: {
      isActive: false,
      discountType: "",
      discountValue: 0,
      startDate: "",
      endDate: "",
    },
  });

  // Handles input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        features: { ...prev.features, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handles nested object changes (e.g., location, features, seller)
  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: string
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof formData],
        [name]: value,
      },
    }));
  };

  // Handles image file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, images: imageUrls }));
    }
  };

  // Form submission handler

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
        Currency:
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="PLN">PLN</option>
        </select>
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

      <h3>Features</h3>
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
        Has Pool:{" "}
        <input
          type="checkbox"
          name="hasPool"
          checked={formData.features.hasPool}
          onChange={handleChange}
        />
      </label>
      <label>
        Has Garage:{" "}
        <input
          type="checkbox"
          name="hasGarage"
          checked={formData.features.hasGarage}
          onChange={handleChange}
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

      <h3>Promotion</h3>
      <label>
        Active:{" "}
        <input
          type="checkbox"
          name="isActive"
          checked={formData.promotion.isActive}
          onChange={handleChange}
        />
      </label>
      <label>
        Discount Type:
        <select
          name="discountType"
          value={formData.promotion.discountType}
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </label>

      <h3>Images</h3>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />

      <button type="submit">Submit Listing</button>
    </form>
  );
};

export default TestForm;
