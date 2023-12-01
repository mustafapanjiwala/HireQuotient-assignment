// Pagination.js
import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageButtons = [];

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
  } else {
    let startPage = 1;
    let endPage = totalPages;

    if (!isLastPage) {
      startPage = Math.max(1, currentPage - 1);
      endPage = Math.min(startPage + 2, totalPages);
    } else {
      startPage = Math.max(1, totalPages - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
  }

  return (
    <>
      <button
        className="pagination-button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={isFirstPage}
      >
        &lt; {/* Use &lt; for < */}
      </button>
      {pageButtons}
      <button
        className="pagination-button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={isLastPage}
      >
        &gt; {/* Use &gt; for > */}
      </button>
    </>
  );
};

export default Pagination;
