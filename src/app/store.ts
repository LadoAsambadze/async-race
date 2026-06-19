import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import garageReducer from '../features/garage/garageSlice';
import winnersReducer from '../features/winners/winnersSlice';
import raceReducer from '../features/race/raceSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    garage: garageReducer,
    winners: winnersReducer,
    race: raceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
