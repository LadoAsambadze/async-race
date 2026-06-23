import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useDeleteCarMutation, useGetCarsQuery } from '../../api/garageApi';
import { useDeleteWinnerMutation } from '../../api/winnersApi';
import { setPage, stopEditing } from './garageSlice';
import { totalPages } from '../../utils/helpers';
import { CARS_PER_PAGE, FIRST_PAGE } from '../../constants';

export const useGarage = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.garage.page);
  const editId = useAppSelector((state) => state.garage.edit.id);
  const isRacing = useAppSelector((state) => state.race.isRacing);

  const { data, isLoading } = useGetCarsQuery({ page, limit: CARS_PER_PAGE });
  const [deleteCar] = useDeleteCarMutation();
  const [deleteWinner] = useDeleteWinnerMutation();

  const cars = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;
  const pageCount = totalPages(totalCount, CARS_PER_PAGE);

  useEffect(() => {
    if (page > pageCount) dispatch(setPage(pageCount));
  }, [page, pageCount, dispatch]);

  const removeCar = useCallback(
    async (id: number) => {
      await deleteCar(id).unwrap();
      await deleteWinner(id)
        .unwrap()
        .catch(() => {});
      if (editId === id) dispatch(stopEditing());
      if (cars.length === 1 && page > FIRST_PAGE) dispatch(setPage(page - 1));
    },
    [cars.length, deleteCar, deleteWinner, dispatch, editId, page],
  );

  const goToPage = useCallback((next: number) => dispatch(setPage(next)), [dispatch]);

  return { cars, totalCount, pageCount, page, isLoading, isRacing, removeCar, goToPage };
};
