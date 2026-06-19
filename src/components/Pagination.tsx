import { FIRST_PAGE } from '../constants';

interface PaginationProps {
  page: number;
  pageCount: number;
  disabled?: boolean;
  onChange: (page: number) => void;
}

const Pagination = ({ page, pageCount, disabled = false, onChange }: PaginationProps) => {
  const isFirst = page <= FIRST_PAGE;
  const isLast = page >= pageCount;

  return (
    <div className="pagination">
      <button
        type="button"
        className="btn"
        disabled={disabled || isFirst}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>
      <span className="pagination__status">
        Page {page} / {pageCount}
      </span>
      <button
        type="button"
        className="btn"
        disabled={disabled || isLast}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
