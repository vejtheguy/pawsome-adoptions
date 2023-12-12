import React, { useEffect, useState } from "react";
import baseURL from "../api/baseUrl";
import Pagination from "../components/pagination";
import SearchInput from "../components/searchInput";
import fetchBreeds from "../api/fetchBreeds";
import fetchDogInfo from "../api/fetchDogInfo";
import AgeRangeInput from "../components/ageRangeInput";
import DogCard from "../components/dogCard";
import SortingFilter from "../components/sorting";
import PostsPerPage from "../components/itemsPerPage";
import FavoriteCard from "../components/favorites";
import generateMatch from "../api/generateMatch";
import DropdownBreeds from "../components/dropdownBreeds";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Search {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  sort?: "asc" | "desc";
  from?: number;
}

const defaultSearch: Search = {
  breeds: [],
  zipCodes: [],
  ageMin: 0,
  ageMax: 20,
  size: 25,
  sort: "asc",
  from: 0,
};

interface DogListPageProps {
  updateMatch: (matchedDog: Dog) => void;
}

const DogListPage: React.FC<DogListPageProps> = ({ updateMatch }) => {
  const storedFavorites = localStorage.getItem("favorites");
  const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [resultIds, setResultIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [zipCodes, setZipCodes] = useState<string>("");
  const [zipCodeInput, setZipCodeInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortValue, setSortValue] = useState<"breed" | "name" | "age">("breed");
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 14]);
  const [postsPerPage, setPostsPerPage] = useState<number>(25);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<string>("");
  const [from, setFrom] = useState<number>(0);
  const [favorites, setFavorites] = useState<Dog[]>(initialFavorites);

  const itemStart = (currentPage - 1) * postsPerPage + 1;
  const itemsOnPage = from + postsPerPage;

  useEffect(() => {
    fetchBreedNames();
    fetchDogData(defaultSearch);
  }, [
    selectedBreeds,
    sortDirection,
    sortValue,
    zipCodes,
    ageRange,
    postsPerPage,
    from,
  ]);

  useEffect(() => {}, [breeds, zipCodes]);

  useEffect(() => {
    fetchDogResults(resultIds);
  }, [resultIds]);

  useEffect(() => {
    handleFrom();
  }, [totalPages, postsPerPage, from]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Handle selected breeds to sorting list
  const handleSelect = (selected: string[]) => {
    setSelectedBreeds(selected);
  };

  // Handle zip code search, checking that the input is valid, and setting the results
  const handleSearchByZipCode = async () => {
    const isValidZipCode = /^\d{5}$/.test(zipCodeInput);

    if (isValidZipCode) {
      try {
        // Fetch data for the given ZIP code
        const searchResult = await fetchDogData({
          ...defaultSearch,
          zipCodes: [zipCodeInput],
        });

        // Check if there are results for the ZIP code
        if (searchResult.total > 0) {
          setZipCodes(zipCodeInput);
        } else {
          setError("No results found for the given ZIP code.");
          setZipCodes("");
        }
      } catch (error) {
        setError("Error fetching data for the given ZIP code.");
      }
    } else {
      setError("Please enter a valid 5-digit ZIP code.");
    }
  };

  const handleMinAgeChange = (value: number) => {
    setAgeRange([value, ageRange[1]]);
  };

  const handleMaxAgeChange = (value: number) => {
    setAgeRange([ageRange[0], value]);
  };

  // Handle input change of zip code
  const handleZipCodeInputChange = (event: string) => {
    setZipCodeInput(event);
    setError(null);

    // If the input is empty, clear the zip code value
    if (event === "") {
      setZipCodes("");
    }
  };

  // Handle amount of cards on the page
  const handlePostsPerPage = (value: number) => {
    // const newPostsPerPage = parseInt(event.target.value, 10);

    // Update the postsPerPage state
    setPostsPerPage(value);

    // Recalculate total pages based on the new postsPerPage value
    const newTotalPages = Math.ceil(resultIds.length / value);

    // Update the totalPages state
    setTotalPages(newTotalPages);

    setCurrentPage(1);
  };

  // Handles the calculation and adjustment of the 'from' value based on the current page and posts per page.
  const handleFrom = () => {
    const calculatedFrom = (currentPage - 1) * postsPerPage;
    setFrom(calculatedFrom);
    scrollToTop();
  };

  // Handles the change in the current page and updates the associated 'from' value accordingly.
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    handleFrom();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle favorites being added or removed from list
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

  // Hold to use for different sorting style
  const [sortAllValue, setSortAllValue] = useState<
    "ageAsc" | "ageDesc" | "breedAsc" | "breedDesc" | "nameAsc" | "nameDesc"
  >("breedAsc");

  // Sorting both value and direction in one
  const handleSortAll = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortAllValue(
      event.target.value as
        | "ageAsc"
        | "ageDesc"
        | "breedAsc"
        | "breedDesc"
        | "nameAsc"
        | "nameDesc"
    );

    switch (event.target.value) {
      case "ageAsc":
        setSortDirection("asc");
        setSortValue("age");
        break;
      case "ageDesc":
        setSortDirection("desc");
        setSortValue("age");
        break;
      case "breedAsc":
        setSortDirection("asc");
        setSortValue("breed");
        break;
      case "breedDesc":
        setSortDirection("desc");
        setSortValue("breed");
        break;
      case "nameAsc":
        setSortDirection("asc");
        setSortValue("name");
        break;
      case "nameDesc":
        setSortDirection("desc");
        setSortValue("name");
        break;
      default:
        setSortDirection("asc");
        setSortValue("name");
    }
  };

  const fetchBreedNames = async () => {
    try {
      const data = await fetchBreeds();
      setBreeds(data);
    } catch (error) {
      // Handle error
    }
  };

  const fetchDogResults = async (ids: string[]) => {
    try {
      const data = await fetchDogInfo(ids);
      setDogs(data);
    } catch (error) {
      // Handle error
    }
  };

  const fetchDogData = async (search: Search) => {
    const searchURL = new URL(`${baseURL}/dogs/search`);
    const params = new URLSearchParams();
    // Add the sort parameter with the format "[name|breed|age]:[asc|desc]"
    params.append("sort", `${sortValue}:${sortDirection}`);

    // Add the sort parameter from an array of selected breeds
    selectedBreeds.forEach((breed) => {
      params.append("breeds", breed);
    });

    // Add sort parameter for zip code, check to make sure that there is at least 5 digits before append
    if (zipCodes.length === 5) {
      params.append("zipCodes", zipCodeInput);
    }

    // Add sort parameter for age range
    params.append("ageMin", ageRange[0].toString());
    params.append("ageMax", ageRange[1].toString());

    // Add sort parameter for view size
    params.append("size", postsPerPage.toString());

    // Add pagination using 'from'
    params.append("from", from.toString());

    searchURL.search = params.toString();

    try {
      const resultIdsResponse = await fetch(searchURL.toString(), {
        method: "GET",
        credentials: "include",
      });
      const data = await resultIdsResponse.json();
      setResultIds(data.resultIds);
      setTotalResults(data.total.toLocaleString());
      setTotalPages(Math.ceil(data.total / postsPerPage));
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex items-top justify-center text-psDarkGray max-w-screen-xl">
      <aside className="flex flex-col px-4 pt-2 pb-4 bg-psLightBlue font-poppins shadow-xl h-fit rounded-lg w-[300px] min-w-300">
        <span className="py-4 flex flex-col gap-3 justify-center border-b border-psMediumGray">
          <h4 className="text-psDarkGray text-xl font-semibold">Breed</h4>
          <span>
            Selected Breeds:{" "}
            {selectedBreeds.length === 0 ? "Any" : selectedBreeds.join(", ")}
          </span>
          <DropdownBreeds options={breeds} onSelect={handleSelect} />
        </span>
        <span className="py-4 flex flex-col gap-3 justify-center border-b border-psMediumGray">
          <h4 className="text-psDarkGray text-xl font-semibold">Age</h4>
          <AgeRangeInput
            ageRange={ageRange}
            handleMinAgeChange={handleMinAgeChange}
            handleMaxAgeChange={handleMaxAgeChange}
          />
        </span>
        <span className="py-4 flex flex-col gap-3 justify-center border-b border-psMediumGray">
          <h4 className="text-psDarkGray text-xl font-semibold">Location</h4>
          <SearchInput
            label="Enter ZIP Code"
            value={zipCodeInput}
            onChange={handleZipCodeInputChange}
            onSubmit={handleSearchByZipCode}
            error={error}
          />
        </span>
        <span className="pt-4 pb-8 flex flex-col gap-6 justify-center">
          <h4 className="text-psDarkGray text-xl font-semibold">
            Results per page
          </h4>
          <PostsPerPage
            postsPerPage={postsPerPage}
            handlePostsPerPage={handlePostsPerPage}
          />
        </span>
        <h4 className="text-psDarkGray text-xl font-semibold py-4 border-t border-psMediumGray">
          Favorites
        </h4>
        <span
          className={`text-sm text-psMediumGray pb-4 ${
            favorites.length > 0 ? "hidden" : "visible"
          }`}
        >
          Select your favorite dogs and they will be added here to help you find
          your perfect match.
        </span>
        <span className=" max-h-[500px] overflow-y-auto ">
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
      </aside>

      <div className="flex flex-col ml-6 justify-center items-center relative min-h-[900px] min-w-[700px]">
        <div className="flex justify-between w-full mb-4">
          <span className="text-psMediumGray cursor-default">
            Showing {itemStart} - {itemsOnPage} of {totalResults} available dogs
          </span>
          <SortingFilter
            sortAllValue={sortAllValue}
            handleSortAll={handleSortAll}
          />
        </div>
        <ul className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              favorite={favorites
                .map((favorite) => favorite.id)
                .includes(dog.id)}
              handleFavorites={handleFavorites}
            />
          ))}
        </ul>
        <Pagination
          addClass="mt-10"
          totalItems={totalPages * postsPerPage}
          itemsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          updateFrom={setFrom}
          resultStart={(currentPage - 1) * postsPerPage + 1}
          resultEnd={from + postsPerPage}
          totalResults={totalResults}
        />
      </div>
    </div>
  );
};

export default DogListPage;
