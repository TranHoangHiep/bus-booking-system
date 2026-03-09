export default function Pagination({ paging, onPageChange }) {
    if (!paging || paging.totalElements <= paging.pageSize) return null;

    const totalPages = Math.ceil(paging.totalElements / paging.pageSize);
    const currentPage = paging.pageIndex;

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible);

        if (end - start < maxVisible) {
            start = Math.max(0, end - maxVisible);
        }

        for (let i = start; i < end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="pagination">
            <button
                className="pagination__btn"
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
                aria-label="Previous page"
            >
                ‹
            </button>

            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    className={`pagination__btn ${page === currentPage ? 'pagination__btn--active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page + 1}
                </button>
            ))}

            <button
                className="pagination__btn"
                disabled={currentPage >= totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
                aria-label="Next page"
            >
                ›
            </button>

            <span className="pagination__info">
                Trang {currentPage + 1} / {totalPages}
            </span>
        </div>
    );
}
