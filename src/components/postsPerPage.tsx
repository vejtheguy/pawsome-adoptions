import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

interface PostsPerPageProps {
  postsPerPage: number;
  handlePostsPerPage: (value: number) => void;
}

const PostsPerPage: React.FC<PostsPerPageProps> = ({
  postsPerPage,
  handlePostsPerPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const values: number[] = [25, 50, 75];

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
  }, [handlePostsPerPage]);

  return (
    <div className="flex justify-center items-center gap-" ref={dropdownRef}>
      <span className="mr-2 cursor-default">View:</span>
      <span className="relative inline-block">
        <button
          type="button"
          className={`flex justify-between items-center rounded-md p-3 text-sm font-semibold  hover:bg-psCoral hover:text-white transition duration-300 ${
            isOpen ? "bg-psCoral text-white" : "bg-psLightGray text-psDarkGray"
          }`}
          id="options-menu"
          onClick={handleToggle}
        >
          {postsPerPage}
          <FontAwesomeIcon icon={faAngleDown} size="sm" className="ml-2" />
        </button>

        {isOpen && (
          <div className="p-2 w-full bg-psLightBlue font-poppins shadow-xl rounded-lg text-md text-center font-semibold text-psDarkGray absolute top-100 right-0 mt-2 z-20 cursor-pointer">
            <ul className="flex flex-col w-full gap-2">
              {values.map((value) => (
                <li
                  key={value}
                  onClick={() => handlePostsPerPage(value)}
                  className="hover:bg-psCoral hover:text-white bg-psWhite rounded-lg w-full p-2"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </span>
    </div>
  );
};

export default PostsPerPage;
