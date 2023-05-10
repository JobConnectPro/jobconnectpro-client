const JobPagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className='flex justify-center'>
        <nav>
          <ul className='pagination'>
            {pageNumbers.map((number) => (
              <li key={number} className='page-item'>
                <button
                  onClick={() => onPageChange(number)}
                  className={`page-link ${currentPage === number && 'active'}`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };

  export default JobPagination