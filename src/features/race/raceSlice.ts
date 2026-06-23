import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RaceResult } from '../../types';

interface RaceState {
  isRacing: boolean;
  winner: RaceResult | null;
}

const initialState: RaceState = {
  isRacing: false,
  winner: null,
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    raceStarted: (state) => {
      state.isRacing = true;
      state.winner = null;
    },
    raceFinished: (state, action: PayloadAction<RaceResult>) => {
      state.winner = action.payload;
    },
    dismissWinner: (state) => {
      state.winner = null;
    },
    raceReset: (state) => {
      state.isRacing = false;
      state.winner = null;
    },
  },
});

export const { raceStarted, raceFinished, dismissWinner, raceReset } = raceSlice.actions;

export default raceSlice.reducer;
