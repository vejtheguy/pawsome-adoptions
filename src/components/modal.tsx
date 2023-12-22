import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Check if mouse click occurs outside of modal; trigger onClose if true
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
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
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full sm:h-full h-screen bg-psBlue bg-opacity-40 flex items-center justify-center backdrop-blur-[2px] cursor-pointer z-50">
      <div
        className="relative flex justify-center items-center max-w-4xl h-full sm:h-fit"
        ref={modalRef}
      >
        {children}
        <FontAwesomeIcon
          icon={faClose}
          className="absolute top-0 right-1 text-psMediumGray p-2 cursor-pointer hover:text-psCoral duration-300 text-6xl sm:text-4xl"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Modal;
