import { useEffect, useState } from "react";
import baseURL from "../api/baseUrl";
import Pagination from "../components/pagination";
import fetchBreeds from "../api/fetchBreeds";
import fetchDogInfo from "../api/fetchDogInfo";
import DogCard from "../components/dogCard";
import SortingFilter from "../components/sortingDropdown";
import FilterOptions from "../components/filterOptions";
import PostsPerPage from "../components/postsPerPage";

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
  handleFavorites: (dog: Dog) => void;
  favorites: Dog[];
}

const DogListPage: React.FC<DogListPageProps> = ({
  handleFavorites,
  favorites,
}) => {
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
  const [itemsDisplayed, setItemsDisplayed] = useState<number>(0);
  const [sortAllValue, setSortAllValue] = useState<
    "ageAsc" | "ageDesc" | "breedAsc" | "breedDesc" | "nameAsc" | "nameDesc"
  >("breedAsc");

  const itemsStart = (currentPage - 1) * postsPerPage + 1;

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

  // Reset current page to 1 when any of the dependencies change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBreeds, sortAllValue, zipCodes, ageRange, postsPerPage]);

  useEffect(() => {}, [breeds, zipCodes]);

  useEffect(() => {
    fetchDogResults(resultIds);
  }, [resultIds]);

  useEffect(() => {
    setItemsDisplayed(currentPage * postsPerPage);
  }, [currentPage, postsPerPage, totalResults]);

  useEffect(() => {
    handleFrom();
    scrollToTop();
  }, [currentPage]);

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
    // Update the postsPerPage state
    setPostsPerPage(value);

    // Recalculate total pages based on the new postsPerPage value
    const newTotalPages = Math.ceil(resultIds.length / value);

    // Update the totalPages state
    setTotalPages(newTotalPages);
  };

  // Handles the calculation and adjustment of the 'from' value based on the current page and posts per page.
  const handleFrom = () => {
    setFrom((currentPage - 1) * postsPerPage);
  };

  // Handles the change in the current page and updates the associated 'from' value accordingly.
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Creates a smooth scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Sorting both value and direction in one
  const handleSortAll = (sortId: string) => {
    setSortAllValue(
      sortId as
        | "ageAsc"
        | "ageDesc"
        | "breedAsc"
        | "breedDesc"
        | "nameAsc"
        | "nameDesc"
    );

    switch (sortId) {
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
      console.error("Error fetching dog breeds:", error);
    }
  };

  const fetchDogResults = async (ids: string[]) => {
    try {
      const data = await fetchDogInfo(ids);
      setDogs(data);
    } catch (error) {
      console.error("Error fetching dog results:", error);
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
    <div className="flex items-top justify-center text-psDarkGray w-full">
      <div className="flex flex-col mx-6 sm:px-0 max-w-screen-xl justify-center items-center relative w-full">
        <div className="flex justify-between items-center flex-col sm:flex-row w-full mb-4 gap-4">
          <FilterOptions
            breeds={breeds}
            selectedBreeds={selectedBreeds}
            handleBreedSelect={handleSelect}
            ageRange={ageRange}
            handleMinAgeChange={handleMinAgeChange}
            handleMaxAgeChange={handleMaxAgeChange}
            zipCodeInput={zipCodeInput}
            handleSearchByZipCode={handleSearchByZipCode}
            handleZipCodeInputChange={handleZipCodeInputChange}
            zipCodeError={error}
          />
          <span className="flex gap-2 sm:gap-4 justify-center items-center sm:flex-nowrap flex-wrap">
            <PostsPerPage
              postsPerPage={postsPerPage}
              handlePostsPerPage={handlePostsPerPage}
            />
            <SortingFilter
              sortAllValue={sortAllValue}
              handleSortAll={handleSortAll}
            />
          </span>
        </div>
        <ul className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
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
          resultStart={itemsStart}
          resultEnd={itemsDisplayed}
          totalResults={totalResults}
        />
      </div>
    </div>
  );
};

export default DogListPage;
