import React from 'react';

const CustomPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
}) => {
  const handlePageChange = (event, pageNumber) => {
    event.preventDefault();
    onPageChange(pageNumber);
  };

  return (
    <nav className='flex items-center justify-between'>
      <div className='text-sm'>
        <p className='font-bold'>
          {totalItems > 0
            ? `Showing ${(currentPage - 1) * 10 + 1} to ${
                currentPage * 10 > totalItems ? totalItems : currentPage * 10
              } of ${totalItems} results`
            : ''}
        </p>
      </div>
      <div className='flex items-center'>
        <button
          className={`${
            currentPage === 1 ? 'cursor-not-allowed opacity-50 hidden' : ''
          } bg-white border border-gray-300 px-2 py-1 rounded-l`}
          onClick={(event) => handlePageChange(event, currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (v, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            } border border-gray-300 px-2 py-1`}
            onClick={(event) => handlePageChange(event, pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50 hidden' : ''
          } bg-white border border-gray-300 px-2 py-1 rounded-r`}
          onClick={(event) => handlePageChange(event, currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default CustomPagination;

CustomPagination.defaultProps = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};