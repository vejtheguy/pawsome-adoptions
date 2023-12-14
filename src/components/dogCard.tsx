import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogCardProps {
  dog: Dog;
  favorite: boolean;
  handleFavorites: (selectedDog: Dog) => void;
}

const DogCard: React.FC<DogCardProps> = ({
  dog,
  favorite,
  handleFavorites,
}) => {
  const { id, img, name, age, breed, zip_code } = dog;
  return (
    <li
      key={id}
      className="bg-psWhite max-w-sm rounded-lg overflow-hidden drop-shadow-lg hover:bg-opacity-70 cursor-pointer group duration-300 relative hover:scale-105"
      onClick={() => handleFavorites(dog)}
    >
      <img src={img} alt={name} className="h-64 w-full object-cover" />
      <div className="px-6 py-4">
        <h3 className="font-semibold text-2xl mb-2 text-psDarkGray flex justify-between items-center">
          {name}, {age}
          <FontAwesomeIcon
            icon={favorite ? faHeartSolid : faHeartRegular}
            className={`w-7 h-7 group-hover:text-psCoral group-hover:duration-300 ${
              favorite ? "text-psCoral animate-beat" : "text-psMediumGray"
            }`}
          />
        </h3>
        <p className="text-psMediumGray ">{breed}</p>
        <p className="text-psMediumGray ">Zip Code: {zip_code}</p>
      </div>
    </li>
  );
};

export default DogCard;
