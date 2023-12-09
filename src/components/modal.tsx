import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-psBlue bg-opacity-40 flex items-center justify-center backdrop-blur-[2px] cursor-pointer">
      <div
        className="relative flex justify-center items-center max-w-4xl"
        ref={modalRef}
      >
        {children}
        <FontAwesomeIcon
          icon={faClose}
          className="absolute top-2 right-2 text-psMediumGray p-2 cursor-pointer hover:text-psCoral duration-300"
          size={"xl"}
          onClick={onClose}
        />
      </div>
    </div>,
    document.body
  );
};

export default Modal;
