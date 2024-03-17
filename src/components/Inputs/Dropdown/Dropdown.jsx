import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Style.css";

/**
 * Dropdown component for selecting options.
 * @param {Object} props - Component props.
 * @param {Array} props.options - Array of options.
 * @param {Function} props.onChange - Function called when an option is selected.
 * @returns {JSX.Element} - Rendered component.
 */
export default function Dropdown({ options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  /**
   * Toggles the dropdown open/close state.
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Handles the click event when an option is clicked.
   * @param {Object} option - Selected option.
   */
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  useEffect(() => {
    /**
     * Closes the dropdown if a click occurs outside of it.
     * @param {MouseEvent} event - Mouse event.
     */
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setIsOpen(false);
  }, [selectedOption]);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        className="custom-dropdown-toggle"
        onClick={toggleDropdown}
        tabIndex="0"
        type="button"
      >
        <span>{selectedOption ? selectedOption.label : "Selecione"}</span>
        <span className="arrow"></span>
      </button>
      {isOpen && (
        <div className="custom-dropdown-content">
          {options.map((option) => (
            <button
              key={option.value}
              className={selectedOption === option ? "selected" : ""}
              onClick={() => {
                handleOptionClick(option);
              }}
              tabIndex="0"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
