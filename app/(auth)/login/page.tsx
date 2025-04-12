import AuthCheck from "@/components/auth/AuthCheck";
import Login from "@/components/auth/Login";
import React from "react";
import classes from "./login.module.scss";
import CheckMiddleware from "@/components/auth/CheckMiddleware";

const page = () => {
  return (
    <div className={classes.page}>
      <Login />
      <AuthCheck />
      <CheckMiddleware />
    </div>
  );
};

export default page;
