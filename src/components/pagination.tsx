interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  resultStart: number;
  resultEnd: number;
  totalResults: string;
  addClass: string;
  setCurrentPage: (page: number) => void;
  updateFrom: (newFrom: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  updateFrom,
  resultStart,
  resultEnd,
  totalResults,
  addClass,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const newFrom = (newPage - 1) * itemsPerPage;
      updateFrom(newFrom);
    }
  };

  return (
    <div className={`flex justify-between items-center w-full ${addClass}`}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`py-3 px-6 font-semibold text-psWhite transition duration-200 rounded-lg tracking-wider hover:bg-psCoral bg-psMediumGray cursor-pointer ${
          currentPage === 1 ? "invisible" : "visible"
        }`}
      >
        Previous
      </button>
      <span className="text-psMediumGray self-end text-center">
        Showing {resultStart} - {resultEnd} of {totalResults} available dogs
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`py-3 px-6 font-semibold text-psWhite transition duration-200 rounded-lg tracking-wider hover:bg-psCoral bg-psMediumGray cursor-pointer ${
          totalItems === 0 || currentPage === totalPages
            ? "invisible"
            : "visible"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
