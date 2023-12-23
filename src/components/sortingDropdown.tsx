import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

interface SortingProps {
  sortAllValue: string;
  handleSortAll: (id: string) => void;
}

const SortingFilter: React.FC<SortingProps> = ({
  sortAllValue,
  handleSortAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set values for sorting options
  const sortValues = [
    { id: "breedAsc", value: "Breed, A-Z" },
    { id: "breedDesc", value: "Breed, Z-A" },
    { id: "ageAsc", value: "Age, low to high" },
    { id: "ageDesc", value: "Age, high to low" },
    { id: "nameAsc", value: "Name, A-Z" },
    { id: "nameDesc", value: "Name, Z-A" },
  ];

  // Search object array to find corresponding value from id
  const sortText = (providedId: string) => {
    const findSort = sortValues.find((obj) => obj.id === providedId);
    return findSort ? findSort.value : null;
  };

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

  // Prevent background scrolling when the dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Makes sure overflow is set back to auto when unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close dropdown once a selection is clicked
  useEffect(() => {
    setIsOpen(false);
  }, [handleSortAll]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <span className="flex justify-center items-center">
        <span className="mr-2 cursor-default">Sort by:</span>
        <button
          type="button"
          className={`flex justify-between items-center rounded-md p-3 text-sm font-semibold  hover:bg-psCoral hover:text-white transition duration-300 ${
            isOpen ? "bg-psCoral text-white" : "bg-psLightGray text-psDarkGray"
          }`}
          id="options-menu"
          onClick={handleToggle}
        >
          {sortText(sortAllValue)}
          <FontAwesomeIcon icon={faAngleDown} size="sm" className="ml-2" />
        </button>
      </span>
      {isOpen && (
        <div className="w-full bg-psLightBlue font-poppins shadow-xl rounded-lg overflow-hidden text-md text-center text-psDarkGray absolute top-100 right-0 mt-2 z-20 cursor-pointer">
          <ul className="flex flex-col w-full">
            {sortValues.map((value) => (
              <li
                key={value.id}
                onClick={() => handleSortAll(value.id)}
                className="hover:bg-psLightCoral hover:font-semibold bg-psWhite w-full py-2 px-4 border-b last:border-0 border-psLightGray"
              >
                {value.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortingFilter;
