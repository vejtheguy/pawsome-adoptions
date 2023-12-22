import Modal from "./modal";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface MatchCardProps {
  dog: Dog | null;
  onClose: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ dog, onClose }) => {
  if (!dog) {
    return (
      <Modal onClose={onClose}>
        <span className="bg-psWhite rounded-lg overflow-hidden cursor-default relative flex flex-col gap-12 sm:gap-6 justify-center items-center p-8 h-full w-full">
          <span className="text-6xl font-bold text-psCoral">
            No matched dog available.
          </span>
        </span>
      </Modal>
    );
  }

  const { img, name, age, breed } = dog;

  return (
    <Modal onClose={onClose}>
      <span className="bg-psWhite rounded-lg overflow-hidden cursor-default relative flex flex-col gap-6 justify-center items-center p-8 h-full">
        <h2 className="sm:text-6xl text-4xl font-bold text-psDarkGray text-center">
          Say hello to your perfect{" "}
          <span className="text-psCoral">pawsome</span> friend!
        </h2>
        <img
          src={img}
          alt={name}
          className="w-full sm:h-[500px] h-[250px] object-cover rounded-lg"
        />
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <h3
            className={`font-semibold text-psDarkGray sm:basis-1/3 sm:text-right sm:pr-8 ${
              name.length > 5 ? "sm:text-6xl text-3xl" : "sm:text-7xl text-5xl"
            }`}
          >
            Meet <span className="text-psCoral">{name}!</span>
          </h3>
          <span className="text-2xl leading-tight text-center mt-4 sm:basis-2/3 sm:pl-8 sm:mt-0 sm:text-xl sm:text-justify sm:border-l-2 sm:border-psMediumGray">
            <span className="text-psCoral font-semibold">{name}</span> is a{" "}
            {age === 0 ? "young puppy" : `${age}-year-old`}{" "}
            {breed.toLowerCase()}. This lovable companion is sure to bring joy,
            laughter, and a whole lot of love to your home. Get ready for
            endless tail wags and paw prints on the journey of a lifetime!
          </span>
        </div>
      </span>
    </Modal>
  );
};

export default MatchCard;
