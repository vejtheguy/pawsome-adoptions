import React from "react";

interface SortingProps {
  sortAllValue: string;
  handleSortAll: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortingFilter: React.FC<SortingProps> = ({
  sortAllValue,
  handleSortAll,
}) => {
  return (
    <div>
      <label htmlFor="selectOption" className="text-psDarkGray mr-1">
        Sort by:
      </label>
      <select
        id="selectOption"
        value={sortAllValue}
        onChange={handleSortAll}
        className="bg-transparent text-psDarkGray outline-none border-none underline underline-offset-2 cursor-pointer hover:text-psCoral"
      >
        <option value="breedAsc">Breed, A-Z</option>
        <option value="breedDesc">Breed, Z-A</option>
        <option value="ageAsc">Age, low to high</option>
        <option value="ageDesc">Age, high to low</option>
        <option value="nameAsc">Name, A-Z</option>
        <option value="nameDesc">Name, Z-A</option>
      </select>
    </div>
  );
};

export default SortingFilter;
