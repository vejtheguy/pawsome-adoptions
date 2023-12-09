import { useState } from "react";
import HeaderNav from "../components/header";
import DogListPage from "../search/dogListPage";
import MatchCard from "../components/matchCard";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

function Home() {
  // State to hold the matched dog information
  const [showModal, setShowModal] = useState(false);
  const [match, setMatch] = useState<Dog | null>(null);

  // Function to update the match state
  const updateMatch = (matchedDog: Dog) => {
    setMatch(matchedDog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="pb-20 w-full flex flex-col justify-center items-center gap-10">
      <HeaderNav />
      <div className="flex flex-col gap-4 justify-center items-center py-12 px-14 max-w-screen-xl rounded-lg bg-psLightBlue drop-shadow-lg cursor-default">
        <h2 className="text-6xl font-bold text-psDarkGray font-poppins">
          Find Your <span className="text-psCoral">Fur-Ever</span> Match!
        </h2>
        <p className="text-center text-xl text-psDarkGray font-poppins px-4">
          Explore a variety of lovable dogs, each with a unique story and charm.
          From playful pups to seasoned companions, your perfect match awaits.
          Select your favorites, and when you're ready, generate a fur-ever
          match to discover the canine companion that perfectly fits your
          lifestyle and heart.
        </p>
      </div>
      <DogListPage updateMatch={updateMatch} />
      {showModal && match && (
        <MatchCard dog={match} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Home;
