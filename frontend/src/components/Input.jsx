import React from "react";
import "./Input.css";

function Input({ onChange, placeholder, value, ...props }) {
  return (
    <div className="InputContainer">
      <input
        onChange={onChange}
        className="Input"
        placeholder={placeholder}
        type="text"
        value={value}
        {...props}
      />
    </div>
  );
}

export default Input;
