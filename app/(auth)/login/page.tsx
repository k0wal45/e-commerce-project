import AuthCheck from "@/components/auth/AuthCheck";
import AuthComponent from "@/components/auth/AuthComponent";
import Login from "@/components/auth/Login";
import React from "react";
import classes from "./login.module.scss";

const page = () => {
  return (
    <div className={classes.page}>
      <Login />
      <AuthComponent />
      <AuthCheck />
    </div>
  );
};

export default page;
