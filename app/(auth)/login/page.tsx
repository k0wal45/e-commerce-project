import AuthCheck from "@/components/auth/AuthCheck";
import AuthComponent from "@/components/auth/AuthComponent";
import React from "react";

const page = () => {
  return (
    <div>
      <AuthComponent />
      <AuthCheck />
    </div>
  );
};

export default page;
