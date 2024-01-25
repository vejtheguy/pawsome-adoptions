import { FormEvent } from "react";

interface SearchInputProps {
  label: string;
  onSubmit: (value: string) => void;
  error?: string | null;
}

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  onSubmit,
  error,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get(label);

    if (typeof value === "string") {
      onSubmit(value);
    }
  };

  return (
    <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
      <label htmlFor={label}>{label}:</label>
      <input
        type="text"
        name={label}
        id={label}
        className={`border rounded-md w-full h-10 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <div className="ml-2 text-red-500">
          <span className="text-sm">{error}</span>
        </div>
      )}
      <button
        type="submit"
        className="flex justify-center w-full rounded-md shadow-sm px-4 py-3 bg-white text-sm font-semibold text-gray-700 hover:bg-psCoral hover:text-white active:bg-gray-200 transition duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
