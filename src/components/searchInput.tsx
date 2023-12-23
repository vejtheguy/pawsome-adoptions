interface SearchInputProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  onSubmit: (value: string) => void;
  error?: string | null;
}

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  value,
  onChange,
  onSubmit,
  error,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={label}>{label}:</label>
      <input
        type="text"
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit(value);
          }
        }}
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
        type="button"
        onClick={() => onSubmit(value)}
        className="flex justify-center w-full rounded-md shadow-sm px-4 py-3 bg-white text-sm font-semibold text-gray-700 hover:bg-psCoral hover:text-white active:bg-gray-200 transition duration-200"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
