import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import AgeRangeInput from "./ageRangeInput";
import DropdownBreeds from "./dropdownBreeds";
import FavoriteCard from "./favorites";
import PostsPerPage from "./itemsPerPage";
import SearchInput from "./searchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

interface FilterOptionsProps {
  selectedBreeds: string[];
  breeds: string[];
  handleBreedSelect: (selected: string[]) => void;
  ageRange: [number, number];
  handleMinAgeChange: (value: number) => void;
  handleMaxAgeChange: (value: number) => void;
  postsPerPage: number;
  handlePostsPerPage: (value: number) => void;
  zipCodeInput?: string;
  handleSearchByZipCode?: (value: string) => void;
  handleZipCodeInputChange?: (value: string) => void;
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="flex justify-between items-center rounded-md shadow-sm px-4 py-3 bg-psLightGray text-sm font-semibold text-psDarkGray hover:bg-psCoral hover:text-white transition duration-300"
        id="options-menu"
        onClick={handleToggle}
      >
        Filter Options
        <FontAwesomeIcon icon={faAngleDown} size="lg" className="ml-6" />
      </button>

      {isOpen && (
        <div className="flex flex-col px-4 pt-2 pb-4 bg-psLightBlue font-poppins shadow-xl h-fit rounded-lg w-[300px] min-w-300 absolute top-100 left-0 mt-2 z-20">
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
          {/* <span className="py-4 flex flex-col gap-3 justify-center border-b border-psMediumGray">
            <h4 className="text-psDarkGray text-xl font-semibold">Location</h4>
            <SearchInput
              label="Enter ZIP Code"
              value={zipCodeInput}
              onChange={handleZipCodeInputChange}
              onSubmit={() => handleSearchByZipCode}
            />
          </span> */}
        </div>
      )}
      {/* <span className="pt-4 pb-8 flex flex-col gap-6 justify-center">
            <h4 className="text-psDarkGray text-xl font-semibold">
              Results per page
            </h4>
            <PostsPerPage
              postsPerPage={postsPerPage}
              handlePostsPerPage={handlePostsPerPage}
            />
          </span> */}

      {/* <h4 className="text-psDarkGray text-xl font-semibold py-4 border-t border-psMediumGray">
          Favorites
        </h4>
        <span
          className={`text-sm text-psMediumGray pb-4 ${
            favorites.length > 0 ? "hidden" : "visible"
          }`}
        >
          Select your favorite dogs and they will be added here to help you find
          your perfect match.
        </span>
        <span className=" max-h-[500px] overflow-y-auto ">
          <ul className="flex flex-col gap-3">
            {favorites.map((favoriteDog: Dog) => {
              return (
                <FavoriteCard
                  key={favoriteDog.id}
                  dog={favoriteDog}
                  handleFavorites={handleFavorites}
                />
              );
            })}
          </ul>
        </span>
        <button
          className={`flex justify-center w-full rounded-md shadow-sm px-4 py-3 mt-4 bg-white text-sm font-semibold text-psDarkGray hover:bg-psCoral hover:text-white active:bg-gray-200 transition duration-200 ${
            favorites.length > 0 ? "visible" : "hidden"
          }`}
          onClick={handleGenerateMatch}
        >
          Match me
        </button> */}
    </div>
  );
};

export default FilterOptions;
