import React from "react";
import PropTypes from "prop-types";

function ButtonGoogle({ text, onClick, type = "submit" }) {
  return (
    <div>
      <button
        type={type}
        className="flex space-x-2 shadow-sm shadow-blue-gray-200 mt-4 w-full rounded-md bg-blue-gray-50 px-5 py-2 align-middle items-center justify-center"
        onClick={onClick}
      >
        <div>
          <img
            src="./src/assets/imgs/google.png"
            alt="google"
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
              backgroundColor: "white",
              borderRadius: 50,
            }}
          />
        </div>
        <div className="text-sm text-blue-gray-900 font-semibold">{text}</div>
      </button>
    </div>
  );
}

ButtonGoogle.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default ButtonGoogle;
