import React from "react";
import { useSelector } from "react-redux";

function Heading({ text }) {
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  return <h2 className={`text-2xl font-bold text-${primaryColor}-500`}>{text}</h2>;
}

export default Heading;
