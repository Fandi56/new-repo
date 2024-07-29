import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Function to handle click on previous button
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    // Function to handle click on next button
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Function to generate array of page numbers
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Maximum visible page numbers (excluding ellipsis)

        if (totalPages <= maxVisiblePages) {
            // Less than or equal to max visible pages, show all
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // More than max visible pages, decide how to display
            const leftEllipsisThreshold = 3; // Display ellipsis after this many pages
            const rightEllipsisThreshold = totalPages - 2; // Display ellipsis before this many pages

            if (currentPage <= leftEllipsisThreshold) {
                // Show first set of pages without ellipsis
                for (let i = 1; i <= maxVisiblePages - 2; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages);
            } else if (currentPage >= rightEllipsisThreshold) {
                // Show last set of pages without ellipsis
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                // Show pages with ellipsis in between
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                const middleStart = currentPage - Math.floor(maxVisiblePages / 2);
                const middleEnd = currentPage + Math.floor(maxVisiblePages / 2);
                for (let i = middleStart; i <= middleEnd; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevious}>
                        Previous
                    </button>
                </li>
                {getPageNumbers().map((page, index) => (
                    <li key={index} className={`page-item ${page === 'ellipsis' ? 'disabled' : ''}`}>
                        {page === 'ellipsis' ? (
                            <span className="page-link">...</span>
                        ) : (
                            <button
                                className={`page-link ${currentPage === page ? 'active' : ''}`}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handleNext}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
