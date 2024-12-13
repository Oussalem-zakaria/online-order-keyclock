import React from 'react';
import PropTypes from 'prop-types';

function Button({ text }) {
  return (
    <div>
      <button
        type="submit"
        className="flex w-full mt-5 justify-center rounded-md border-2 border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {text}
      </button>
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
