import { useEffect, useState } from "react";
import HeaderNav from "../components/header";
import DogListPage from "./dogListPage";
import MatchCard from "../components/matchCard";
import generateMatch from "../api/generateMatch";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

function Home() {
  // Setting initial favorites for useState
  const storedFavorites = localStorage.getItem("favorites");
  const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  // State to hold the matched dog information
  const [showModal, setShowModal] = useState(false);
  const [match, setMatch] = useState<Dog | null>(null);

  // State to hold favorites & trigger favoritePing when favorites is updated
  const [favorites, setFavorites] = useState<Dog[]>(initialFavorites);
  const [favoritePing, setFavoritePing] = useState<boolean>(false);

  // Function to update the match state
  const updateMatch = (matchedDog: Dog) => {
    setMatch(matchedDog);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle favorite add and removal
  const handleFavorites = (dog: Dog) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (favoriteDog) => favoriteDog.id === dog.id
      );

      if (isFavorite) {
        // If it is, remove it
        return prevFavorites.filter((favoriteDog) => favoriteDog.id !== dog.id);
      } else {
        // If it's not, add it
        return [...prevFavorites, dog];
      }
    });
  };

  // Handle match generator
  const handleGenerateMatch = async () => {
    try {
      const matchId = await generateMatch(
        favorites.map((favoriteDog) => favoriteDog.id)
      );

      const matchedDog = favorites.find(
        (favoriteDog) => favoriteDog.id === matchId
      );

      if (matchedDog) {
        updateMatch(matchedDog);
      } else {
        console.log("No matching dog found in favorites.");
      }
    } catch (error) {
      // Handle error
    }
  };

  // Update local storage when changes are done to 'favorites'
  useEffect(() => {
    setFavoritePing(true);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    const timeOutId = setTimeout(() => {
      setFavoritePing(false);
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [favorites]);

  return (
    <div className="pb-20 flex flex-col justify-center items-center sm:gap-10">
      <HeaderNav
        favorites={favorites}
        favoritePing={favoritePing}
        handleFavorites={handleFavorites}
        handleGenerateMatch={handleGenerateMatch}
      />
      <div className="flex flex-col gap-4 justify-center items-center py-12 px-8 sm:px-14 max-w-screen-xl rounded-lg bg-psLightBlue drop-shadow-lg cursor-default mb-10 sm:mb-0 sm:mx-6">
        <h2 className="text-5xl sm:text-6xl font-bold text-psDarkGray font-poppins text-center">
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
      <DogListPage handleFavorites={handleFavorites} favorites={favorites} />
      {showModal && match && (
        <MatchCard dog={match} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Home;
