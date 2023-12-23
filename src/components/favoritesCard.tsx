import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface FavoriteCardProps {
  dog: Dog;
  handleFavorites: (id: Dog) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  dog,
  handleFavorites,
}) => {
  const { id, img, name, age, breed, zip_code } = dog;
  return (
    <li
      key={id}
      className="bg-psWhite w-full h-20 rounded-lg overflow-hidden drop-shadow-lg hover:bg-opacity-90 cursor-pointer flex justify-between group"
      onClick={() => handleFavorites(dog)}
    >
      <img src={img} alt={name} className="object-cover min-w-[100px]" />
      <div className="flex flex-col items-start justify-center px-3 py-2 gap-0.5 w-full">
        <h3 className="font-semibold text-lg leading-none text-psDarkGray w-24 truncate">
          {name}, {age}
        </h3>
        <p className="text-psMediumGray text-xs truncate w-24">{breed}</p>
        <p className="text-psMediumGray text-xs">Zip Code: {zip_code}</p>
      </div>
      <span className="flex justify-center items-center h-full mr-3">
        <FontAwesomeIcon icon={faHeartSolid} className="w-6 h-6 text-psCoral" />
      </span>
      <span className="bg-psDarkGray w-full h-full absolute bg-opacity-40 flex justify-center items-center invisible group-hover:visible  transition-all duration-100">
        <FontAwesomeIcon icon={faTrashCan} className="w-10 h-10 text-psWhite" />
      </span>
    </li>
  );
};

export default FavoriteCard;
