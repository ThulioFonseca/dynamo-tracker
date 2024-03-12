import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Style.css";

/**
 * SearchSelect component for selecting options.
 * @param {Object} props - Component props.
 * @param {Array} props.options - Array of options.
 * @param {Function} props.onChange - Function called when an option is selected.
 * @param {Function} props.onSearch - Function called when the search value changes.
 * @param {boolean} props.hasError - Whether the search-select has an error.
 * @returns {JSX.Element} - Rendered component.
 */
export default function SearchSelect({
  value,
  options,
  onChange,
  onSearch,
  hasError,
  disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const searchSelectRef = useRef(null);

  /**
   * Toggles the search-select open/close state.
   */
  const toggleSearchSelect = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Handles the click event when an option is clicked.
   * @param {Object} option - Selected option.
   */
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false); // Close the search-select after selecting an option
  };

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  useEffect(() => {
    /**
     * Closes the search-select if a click occurs outside of it.
     * @param {MouseEvent} event - Mouse event.
     */
    function handleClickOutside(event) {
      if (
        searchSelectRef.current &&
        !searchSelectRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchSelectRef]);

  useEffect(() => {
    setIsOpen(false);
  }, [selectedOption]);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <div className="custom-search-select" ref={searchSelectRef}>
      <button
        className="custom-search-select-toggle"
        onClick={toggleSearchSelect}
        tabIndex="0"
        type="button"
        style={hasError ? { border: "1px solid red" } : {}}
        disabled={disabled}
      >
        <span>{selectedOption ? selectedOption.label : "Selecione"}</span>
        <span className="arrow"></span>
      </button>
      {isOpen && (
        <div className="custom-search-select-content">
          <div className="w-100 m-0 p-0 d-flex align-items-center justify-content-center">
            <input
              type="text"
              placeholder="Search..."
              className="search-select-input"
              onChange={(event) => handleSearch(event)}
            />
          </div>
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

SearchSelect.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};
