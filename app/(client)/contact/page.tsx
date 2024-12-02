import Form from "@/components/Contact/Form/Form";
import UniversalHero from "@/components/Hero/Universal/UniversalHero";
import React from "react";

const page = () => {
  return (
    <main>
      <UniversalHero
        title="Contact us"
        image="https://images.unsplash.com/photo-1729547312204-aca48a5b4eb2?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Form />
    </main>
  );
};

export default page;
