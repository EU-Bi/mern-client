import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTests = createAsyncThunk("tests/fetchTests", async () => {
  const { data } = await axios.get("/tests");
  return data;
});
export const fetchScores = createAsyncThunk("scores/fetchScores", async () => {
  const { data } = await axios.get("/scores");
  return data;
});
const initialState = {
  tests: {
    items: [],
    status: "loading",
  },
  scores: {
    items: [],
    status: "loading",
  },
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTests.pending]: (state, action) => {
      state.tests.items = [];
      state.tests.status = "loading";
    },
    [fetchTests.fulfilled]: (state, action) => {
      state.tests.items = action.payload;
      state.tests.status = "loaded";
    },
    [fetchTests.rejected]: (state) => {
      state.tests.items = [];
      state.tests.status = "error";
    },
    [fetchScores.pending]: (state, action) => {
      state.scores.items = [];
      state.scores.status = "loading";
    },
    [fetchScores.fulfilled]: (state, action) => {
      state.scores.items = action.payload;
      state.scores.status = "loaded";
    },
    [fetchScores.rejected]: (state) => {
      state.scores.items = [];
      state.scores.status = "error";
    },
  },
});

export const testsReducer = testsSlice.reducer;
