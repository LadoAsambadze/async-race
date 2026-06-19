import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CAR_COLOR, FIRST_PAGE } from '../../constants';
import type { Car } from '../../types';

interface EditState {
  id: number | null;
  name: string;
  color: string;
}

interface GarageState {
  page: number;
  createName: string;
  createColor: string;
  edit: EditState;
}

const emptyEdit: EditState = { id: null, name: '', color: DEFAULT_CAR_COLOR };

const initialState: GarageState = {
  page: FIRST_PAGE,
  createName: '',
  createColor: DEFAULT_CAR_COLOR,
  edit: { ...emptyEdit },
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCreateName: (state, action: PayloadAction<string>) => {
      state.createName = action.payload;
    },
    setCreateColor: (state, action: PayloadAction<string>) => {
      state.createColor = action.payload;
    },
    resetCreateForm: (state) => {
      state.createName = '';
      state.createColor = DEFAULT_CAR_COLOR;
    },
    startEditing: (state, action: PayloadAction<Car>) => {
      state.edit = { ...action.payload };
    },
    setEditName: (state, action: PayloadAction<string>) => {
      state.edit.name = action.payload;
    },
    setEditColor: (state, action: PayloadAction<string>) => {
      state.edit.color = action.payload;
    },
    stopEditing: (state) => {
      state.edit = { ...emptyEdit };
    },
  },
});

export const {
  setPage,
  setCreateName,
  setCreateColor,
  resetCreateForm,
  startEditing,
  setEditName,
  setEditColor,
  stopEditing,
} = garageSlice.actions;

export default garageSlice.reducer;
