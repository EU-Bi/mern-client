import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  create: [],
};

const createTestSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    create: (state, action) => {
      state.create = action.payload;
    },
  },
});

export const createReducer = createTestSlice.reducer;
export const { create } = createTestSlice.actions;
