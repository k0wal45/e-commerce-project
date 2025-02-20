"use client";
import { Fragment, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import classes from "./form.module.scss";
const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { name, email, phone, message } = formData;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form: any = useRef();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMutate = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (e.target.validate.checked) {
      console.log("validate");
      toast.error("Something went wrong, please contact us via email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (!e.target.accpet.checked) {
      toast.error(
        "Remember to accept the terms and conditions to send the form",
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
      return;
    }

    // Wyrażenia regularne do walidacji
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{9,15}$/;

    // Sprawdzanie pola "name"
    if (name.trim() === "") {
      toast.error("Wrong name", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // Sprawdzanie pola "email"
    if (email.trim() === "") {
      toast.error("Wrong e-mail address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Wrong e-mail address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // Sprawdzanie pola "phone"
    if (phone.trim() === "") {
      toast.error("Wrong phone number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else if (!phoneRegex.test(phone)) {
      toast.error("Wrong phone number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // Sprawdzanie pola "message"
    if (message.trim() === "") {
      toast.error("Something went wrong, please contact us via email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    toast.success("Messages sent succesfuly", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={handleSubmit} ref={form}>
        <p>Didn&apos;t find anything thats suit&apos;s you? Hit us up!</p>

        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          onChange={onMutate}
          value={name}
          required
        />
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            onChange={onMutate}
            value={email}
            required
          />

          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone number"
            onChange={onMutate}
            value={phone}
            required
          />
        </div>

        <input
          type="checkbox"
          name="validate"
          id="validate"
          className={classes.hidden}
        />

        <textarea
          name="message"
          id="message"
          placeholder="Message"
          onChange={onMutate}
          value={message}
          required
        />

        <div>
          <input type="checkbox" name="accpet" id="accpet" required />
          <label htmlFor="accept">
            By accepting, you consent to the processing of your personal data by
            the website owner and to receiving offers and commercial information
            via the provided email address or phone number.
          </label>
        </div>

        <button type="submit" className="basicbutton">
          Prześlij
        </button>

        <ToastContainer />
      </form>
    </Fragment>
  );
};

export default Form;
