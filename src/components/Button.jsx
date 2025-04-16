// Button.jsx
import React from "react";

const Button = ({ name, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 m-1 rounded-lg cursor-pointer w-full ${
        active ? "bg-black text-white" : "bg-gray-200"
      } hover:bg-gray-300`}
    >
      {name}
    </button>
  );
};

export default Button;
