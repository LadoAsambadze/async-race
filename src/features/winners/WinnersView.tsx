import WinnersTable from './WinnersTable';
import Pagination from '../../components/Pagination';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetWinnersQuery } from '../../api/winnersApi';
import { setWinnersPage, toggleSort } from './winnersSlice';
import { totalPages } from '../../utils/helpers';
import { WINNERS_PER_PAGE } from '../../constants';

const WinnersView = () => {
  const dispatch = useAppDispatch();
  const { page, sort, order } = useAppSelector((state) => state.winners);
  const { data, isLoading } = useGetWinnersQuery({ page, limit: WINNERS_PER_PAGE, sort, order });

  const winners = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;
  const pageCount = totalPages(totalCount, WINNERS_PER_PAGE);

  return (
    <section className="view">
      <h2 className="view__title">Winners ({totalCount})</h2>

      {isLoading && <p className="muted">Loading…</p>}
      {!isLoading && winners.length === 0 && (
        <p className="muted">No winners yet — go win a race! 🏁</p>
      )}
      {!isLoading && winners.length > 0 && (
        <WinnersTable
          winners={winners}
          page={page}
          sort={sort}
          order={order}
          onSort={(field) => dispatch(toggleSort(field))}
        />
      )}

      <Pagination
        page={page}
        pageCount={pageCount}
        onChange={(next) => dispatch(setWinnersPage(next))}
      />
    </section>
  );
};

export default WinnersView;
