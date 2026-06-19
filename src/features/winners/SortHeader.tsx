import type { SortOrder, WinnersSortField } from '../../types';

interface SortHeaderProps {
  label: string;
  field: WinnersSortField;
  activeField: WinnersSortField;
  order: SortOrder;
  onSort: (field: WinnersSortField) => void;
}

const SortHeader = ({ label, field, activeField, order, onSort }: SortHeaderProps) => {
  const isActive = activeField === field;
  const arrow = isActive ? ` ${order === 'asc' ? '▲' : '▼'}` : '';

  return (
    <th>
      <button type="button" className="th-sort" onClick={() => onSort(field)}>
        {label}
        {arrow}
      </button>
    </th>
  );
};

export default SortHeader;
