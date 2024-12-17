import React from "react";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function SelectList({ name, label, options, handleChange = null, value, defaultValue = "" }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const primaryColor = useSelector((state) => state.settings.primaryColor);

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900 capitalize"
        >
          {label}
        </label>
      </div>
      <div className="mt-2">
        <select
          id={name}
          name={name}
          {...register(name)}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          className={`block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-${primaryColor}-500 sm:text-sm sm:leading-6 ps-3 ${
            errors[name] ? "border-red-500 ring-red-500" : ""
          }`}
        >
          <option value="" disabled>
            {`Sélectionner ${label}`}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[name] && (
          <p className="mt-2 text-sm text-red-600">{errors[name]?.message}</p>
        )}
      </div>
    </div>
  );
}

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.string,
};

export default SelectList;