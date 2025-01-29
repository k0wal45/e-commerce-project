"use client";
import React, { useState } from "react";
import classes from "./select.module.scss";
import { motion } from "framer-motion";

const Select = ({
  selected,
  setSelected,
  values,
}: {
  selected: string;
  setSelected: any;
  values: string[];
}) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Select;
