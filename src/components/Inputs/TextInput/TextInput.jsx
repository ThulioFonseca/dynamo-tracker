import { useState } from "react";
import "./Style.css";

/**
 * Renders a text input component.
 *
 * @param {Object} props - The properties object containing value, onChange, hasError, and disabled.
 * @return {JSX.Element} The input element representing the text input component.
 */
const TextInput = ({ value, onChange, hasError, disabled }) => {
  return (
    <input
      className="w-100 h-75 text-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={hasError ? { border: "1px solid red" } : {}}
      disabled={disabled}
    />
  );
};
export default TextInput;
