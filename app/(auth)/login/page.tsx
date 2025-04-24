import Login from "@/components/auth/Login";
import React from "react";
import classes from "./login.module.scss";

const page = () => {
  return (
    <div className={classes.page}>
      <Login />
    </div>
  );
};

export default page;
