import CarIcon from '../../components/CarIcon';
import SortHeader from './SortHeader';
import { WINNERS_PER_PAGE } from '../../constants';
import type { SortOrder, WinnersSortField, WinnerView } from '../../types';

interface WinnersTableProps {
  winners: WinnerView[];
  page: number;
  sort: WinnersSortField;
  order: SortOrder;
  onSort: (field: WinnersSortField) => void;
}

const WINNER_ICON_SIZE = 44;

const WinnersTable = ({ winners, page, sort, order, onSort }: WinnersTableProps) => (
  <table className="winners-table">
    <thead>
      <tr>
        <th>№</th>
        <th>Car</th>
        <th>Name</th>
        <SortHeader label="Wins" field="wins" activeField={sort} order={order} onSort={onSort} />
        <SortHeader
          label="Best time (s)"
          field="time"
          activeField={sort}
          order={order}
          onSort={onSort}
        />
      </tr>
    </thead>
    <tbody>
      {winners.map((winner, index) => (
        <tr key={winner.id}>
          <td>{(page - 1) * WINNERS_PER_PAGE + index + 1}</td>
          <td>
            <CarIcon color={winner.color} size={WINNER_ICON_SIZE} />
          </td>
          <td>{winner.name}</td>
          <td>{winner.wins}</td>
          <td>{winner.time}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default WinnersTable;
