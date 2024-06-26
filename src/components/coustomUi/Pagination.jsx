import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const PaginationComp = ({ currentPage, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const numPagesToShow = 10;

    if (totalPages <= numPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(numPagesToShow / 2);
      let startPage = Math.max(currentPage - half, 2);
      let endPage = Math.min(currentPage + half, totalPages - 1);

      if (currentPage <= half) {
        endPage = numPagesToShow - 1;
      } else if (currentPage + half >= totalPages) {
        startPage = totalPages - numPagesToShow + 2;
      }

      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-2">
      <Pagination>
        <PaginationContent className='flex flex-wrap justify-center'>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} disabled={currentPage === 1} className={'cursor-pointer'} />
          </PaginationItem>
          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <span className="mx-2">...</span>
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  className={currentPage === page ? 'border cursor-pointer' : 'cursor-pointer'}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={handleNext} disabled={currentPage === totalPages} className={'cursor-pointer'} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComp;
