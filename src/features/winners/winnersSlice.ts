import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FIRST_PAGE } from '../../constants';
import type { SortOrder, WinnersSortField } from '../../types';

interface WinnersState {
  page: number;
  sort: WinnersSortField;
  order: SortOrder;
}

const initialState: WinnersState = {
  page: FIRST_PAGE,
  sort: 'id',
  order: 'asc',
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    // Clicking a column header sorts by it; clicking again flips the direction.
    toggleSort: (state, action: PayloadAction<WinnersSortField>) => {
      if (state.sort === action.payload) {
        state.order = state.order === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort = action.payload;
        state.order = 'asc';
      }
    },
  },
});

export const { setPage: setWinnersPage, toggleSort } = winnersSlice.actions;

export default winnersSlice.reducer;
