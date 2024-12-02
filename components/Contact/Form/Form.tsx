"use client";
import { Fragment, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      return;
    }

    if (!e.target.accpet.checked) {
      toast.error(
        "Pamiętaj aby wyrazić zgodę na przetwarzanie danych na dole formularza",
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
      toast.error("Nieprawidłowo wpisane imię", {
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
      toast.error("Nieprawidłowy adres e-mail", {
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
      toast.error("Nieprawidłowy adres e-mail", {
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
      toast.error("Nieprawidłowy numer telefonu", {
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
      toast.error("Nieprawidłowy numer telefonu", {
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
      return;
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    toast.success("Sukces", {
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
