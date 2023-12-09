// Dropdown.tsx
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Use type assertion to tell TypeScript that dropdownRef.current is not null
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      handleClickOutside(event);
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleDocumentClick);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []); // Ensure the effect runs only once during mount and unmount

  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions, onSelect]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex justify-center w-full rounded-md shadow-sm px-4 py-3 bg-white text-sm font-semibold text-gray-700 hover:bg-psCoral hover:text-white active:bg-gray-200 transition duration-200"
          id="options-menu"
          onClick={handleToggle}
        >
          Select Breeds
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
