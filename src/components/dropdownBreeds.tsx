// Dropdown.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useRef } from "react";

interface DropdownBreedsProps {
  options: string[];
  onSelect: (selectedOptions: string[]) => void;
}

const DropdownBreeds: React.FC<DropdownBreedsProps> = ({
  options,
  onSelect,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handles the boolean of when to open and close the dropdown
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Handle checkbox selections
  const handleOptionChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Check if mouse click occurs outside of modal; trigger onClose if true
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Add event listener for clicking outside of of modal
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  // Notify the parent component when the selected options change
  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions, onSelect]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex justify-between items-center w-full rounded-md shadow-sm px-4 py-3 bg-white text-sm font-semibold text-psDarkGray hover:bg-psCoral hover:text-white transition duration-300"
          id="options-menu"
          onClick={handleToggle}
        >
          Select Breeds
          <FontAwesomeIcon icon={faAngleDown} size="lg" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-full max-h-72 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-4 py-2 hover:bg-psLightCoral hover:font-semibold cursor-pointer transition duration-150"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownBreeds;
