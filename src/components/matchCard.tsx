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
      <span className="text-6xl font-bold text-psCoral">
        No matched dog available.
      </span>
    );
  }

  const { img, name, age, breed } = dog;
  const isPuppy = (age: number) => {
    return;
  };

  const startsWithVowel = (word: string) => {
    const lowerCaseWord = word.toLowerCase();
    const vowels = ["a", "e", "i", "o", "u"];
    return vowels.includes(lowerCaseWord.charAt(0));
  };

  return (
    <Modal onClose={onClose}>
      <span className="bg-psWhite rounded-lg overflow-hidden cursor-default relative flex flex-col gap-6 items-center p-8">
        <h2 className="text-6xl font-bold text-psDarkGray text-center">
          Say hello to your perfect{" "}
          <span className="text-psCoral">pawsome</span> friend!
        </h2>
        <img
          src={img}
          alt={name}
          className="w-full h-[500px] object-cover rounded-lg"
        />
        <div className="flex justify-center items-center">
          <h3
            className={`font-semibold mb-2 text-psDarkGray basis-1/3 text-right  pr-8 ${
              name.length > 5 ? "text-6xl" : "text-7xl"
            }`}
          >
            Meet <span className="text-psCoral">{name}!</span>
          </h3>
          <span className="basis-2/3 pl-8 text-xl text-justify border-l-2 border-psMediumGray">
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
