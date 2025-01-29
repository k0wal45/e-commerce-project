import AddListingForm from "@/components/Dashboard/Form/AddListingForm";
import GetDataButton from "@/components/Dashboard/Form/GetImageButton";
import TestForm from "@/components/Dashboard/Form/TestForm";
import React from "react";

const page = () => {
  return (
    <main>
      <AddListingForm />
      <GetDataButton />
      <TestForm />
    </main>
  );
};

export default page;
