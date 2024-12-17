import React from "react";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const InputFile = ({ name, label, accept }) => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium mb-1">{label}</label>
      <input
        id={name}
        type="file"
        accept={accept}
        {...register(name)}
        className="border rounded-md p-2"
      />
    </div>
  );
};

export default InputFile;