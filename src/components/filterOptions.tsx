import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import AgeRangeInput from "./ageRangeInput";
import DropdownBreeds from "./dropdownBreeds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import SearchInput from "./searchInput";

interface FilterOptionsProps {
  selectedBreeds: string[];
  breeds: string[];
  handleBreedSelect: (selected: string[]) => void;
  ageRange: [number, number];
  handleMinAgeChange: (value: number) => void;
  handleMaxAgeChange: (value: number) => void;
  zipCodeInput: string;
  handleSearchByZipCode: (value: string) => void;
  handleZipCodeInputChange: (value: string) => void;
  zipCodeError: string | null;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  selectedBreeds,
  breeds,
  handleBreedSelect,
  ageRange,
  handleMinAgeChange,
  handleMaxAgeChange,
  zipCodeInput,
  handleZipCodeInputChange,
  handleSearchByZipCode,
  zipCodeError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handles the boolean of when to open and close the dropdown
  const handleToggle = () => {
    setIsOpen(!isOpen);
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

  // Prevent background scrolling when the dropdown is open in desktop view; allow scroll when on smaller screens
  useEffect(() => {
    if (isOpen) {
      if (window.innerWidth >= 768) {
        // Disable scrolling on desktop
        document.body.style.overflow = "hidden";
      }
    } else {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className="sm:relative inline-block text-left w-full sm:w-fit"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="flex justify-between items-center rounded-md shadow-sm px-4 py-3 bg-psLightGray text-sm font-semibold text-psDarkGray hover:bg-psCoral hover:text-white transition duration-300 w-full sm:w-fit"
        id="options-menu"
        onClick={handleToggle}
      >
        Filter Options
        <FontAwesomeIcon icon={faAngleDown} size="lg" className="ml-6" />
      </button>

      {isOpen && (
        <div className="flex flex-col px-4 pt-2 pb-4 bg-psLightBlue font-poppins shadow-xl h-fit rounded-lg sm:w-[300px] w-full absolute top-100 left-0 mt-2 z-20">
          <span className="py-4 flex flex-col gap-3 justify-center border-b border-psMediumGray">
            <h4 className="text-psDarkGray text-xl font-semibold">Breed</h4>
            <span>
              Selected Breeds:{" "}
              {selectedBreeds.length === 0 ? "Any" : selectedBreeds.join(", ")}
            </span>
            <DropdownBreeds
              options={breeds}
              selectedOptions={selectedBreeds}
              onSelect={handleBreedSelect}
            />
          </span>
          <span className="py-4 flex flex-col gap-3 justify-center border-b border-psMediumGray">
            <h4 className="text-psDarkGray text-xl font-semibold">Age</h4>
            <AgeRangeInput
              ageRange={ageRange}
              handleMinAgeChange={handleMinAgeChange}
              handleMaxAgeChange={handleMaxAgeChange}
            />
          </span>
          <span className="py-4 flex flex-col gap-3 justify-center">
            <h4 className="text-psDarkGray text-xl font-semibold">Location</h4>
            <SearchInput
              label="Enter ZIP Code"
              value={zipCodeInput}
              onChange={handleZipCodeInputChange}
              onSubmit={handleSearchByZipCode}
              error={zipCodeError}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
