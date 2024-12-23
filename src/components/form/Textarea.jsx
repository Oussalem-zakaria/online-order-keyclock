import React from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

function Textarea({ name, label, handleChange, value }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      </div>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          {...register(name)}
          autoComplete={`current-${name}`}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ps-3 ${errors[name] ? 'border-red-500 ring-red-500' : ''
            }`}
          onChange={handleChange}
          value={value}
          placeholder={label}
        />
        {errors[name] && <p className="mt-2 text-sm text-red-600">{errors[name]?.message}</p>}
      </div>
    </div>
  );
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Textarea;