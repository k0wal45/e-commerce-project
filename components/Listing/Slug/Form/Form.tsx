"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const SimpleContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      status: "new",
      page: "contact",
      data: {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
      },
    };

    try {
      // Prześlij pliki i dane do API
      const response = await fetch("/api/formHandler/clientFormSubmition", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      toast.success(
        "Cos poszło nie tak, Skontaktuj się mailowo: lunarisweb.pl@gmail.com",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "Cos poszło nie tak, Skontaktuj się mailowo: lunarisweb.pl@gmail.com",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          value={formData.name}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
          value={formData.phone}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          required
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <button type="submit">{loading ? "Sending..." : "Send"}</button>
      <ToastContainer />
    </form>
  );
};

export default SimpleContactForm;
