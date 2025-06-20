import classes from "./contact.module.scss";
import Form from "@/components/Contact/Form/Form";
import UniversalHero from "@/components/Hero/Universal/UniversalHero";
import Image from "next/image";

import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

const page = () => {
  return (
    <main>
      <UniversalHero
        title="Contact us"
        image="https://images.unsplash.com/photo-1729547312204-aca48a5b4eb2?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        position="bottom"
      />
      <div className={classes.contact}>
        <Form />
        <div className={classes.container}>
          <div className={classes.image}>
            <Image
              src="https://images.unsplash.com/photo-1489370321024-e0410ad08da4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Contact Us"
              width={500}
              height={300}
            />
          </div>
          <div className={classes.contact__info}>
            <h2>Contact Information</h2>

            <div className={classes.contact__info__details}>
              <div className={classes.box}>
                <FaPhone />
                Call Us
              </div>
              <p>+1 (234) 567-890</p>
            </div>

            <div className={classes.contact__info__details}>
              <div className={classes.box}>
                <FaEnvelope />
                Email Us
              </div>
              <p>press@housee.com</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
