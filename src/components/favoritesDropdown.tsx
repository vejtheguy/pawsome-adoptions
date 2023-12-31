import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import FavoriteCard from "./favoritesCard";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface FavoriteDropdownProps {
  favorites: Dog[];
  handleFavorites: (value: Dog) => void;
  handleGenerateMatch: () => void;
  favoritePing: boolean;
}

const FavoriteDropdown: React.FC<FavoriteDropdownProps> = ({
  favorites,
  favoritePing,
  handleFavorites,
  handleGenerateMatch,
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
        className={`relative flex justify-between items-center rounded-lg hover:shadow-sm px-4 py-2 text-md font-semibold text-psWhite  hover:bg-psCoral transition duration-300 group ${
          isOpen ? "bg-psCoral" : "bg-transparent"
        }`}
        id="options-menu"
        onClick={handleToggle}
      >
        Favorites
        <span className="relative flex justify-center items-center ml-2">
          <FontAwesomeIcon
            icon={faHeart}
            size="2xl"
            className={`relative group-hover:text-psWhite ${
              isOpen ? "text-psWhite" : "text-psCoral"
            } ${favoritePing ? "animate-beat" : ""}`}
          />
          <span
            className={`absolute text-xs group-hover:text-psCoral ${
              isOpen ? "text-psCoral" : "text-white"
            }`}
          >
            {favorites.length > 0 ? `${favorites.length}` : ""}
          </span>
        </span>
      </button>
      {isOpen && (
        <div className="flex flex-col px-4 pt-2 pb-4 bg-psLightBlue font-poppins shadow-xl h-fit rounded-lg w-[300px] min-w-300 absolute top-100 sm:right-0 mt-2 z-20">
          <h4 className="text-psDarkGray text-xl font-semibold py-2">
            Favorites
          </h4>
          <span
            className={`text-sm text-psMediumGray pb-4 ${
              favorites.length > 0 ? "hidden" : "visible"
            }`}
          >
            Select your favorite dogs and they will be added here to help you
            find your perfect match.
          </span>
          <span className="sm:max-h-[500px] max-h-80 overflow-y-auto ">
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
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoriteDropdown;
