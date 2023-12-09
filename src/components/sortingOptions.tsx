import React from "react";

interface SortingOptionsProps {
  sortValue: "breed" | "name" | "age";
  sortDirection: "asc" | "desc";
  onSortValueChange: (value: "breed" | "name" | "age") => void;
  onSortDirectionChange: (direction: "asc" | "desc") => void;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({
  sortValue,
  sortDirection,
  onSortValueChange,
  onSortDirectionChange,
}) => {
  return (
    <div>
      <label htmlFor="selectOption">Sort by:</label>
      <select
        id="selectOption"
        value={sortValue}
        onChange={(e) =>
          onSortValueChange(e.target.value as "breed" | "name" | "age")
        }
      >
        <option value="age">Age</option>
        <option value="breed">Breed</option>
        <option value="name">Name</option>
      </select>

      <h2>Toggle Sort Direction: </h2>
      <button
        type="button"
        className="inline-flex justify-center w-fit rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
        onClick={() =>
          onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")
        }
      >
        {sortDirection === "asc" ? "Ascending" : "Descending"}
      </button>

      <p>
        Current Sort Value:{" "}
        {sortValue === "breed"
          ? "Breed"
          : sortValue === "name"
          ? "Name"
          : "Age"}
      </p>
      <p>
        Current Sort Direction: {sortDirection === "asc" ? "A - Z" : "Z - A"}
      </p>
    </div>
  );
};

export default SortingOptions;
