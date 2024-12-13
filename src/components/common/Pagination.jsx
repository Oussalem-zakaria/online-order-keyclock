import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const primaryColor = useSelector((state) => state.settings.primaryColor);

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

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={handlePrevious}
        className={`px-4 py-2 text-blue-700 rounded-md hover:bg-blue-200`}
        disabled={currentPage === 1}
      >
        <FaArrowLeft />
      </button>
      <span className={`text-blue-700`}>
        Page {currentPage} sur {totalPages}
      </span>
      <button
        onClick={handleNext}
        className={`px-4 py-2 text-blue-700 rounded-md hover:bg-blue-200`}
        disabled={currentPage === totalPages}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;