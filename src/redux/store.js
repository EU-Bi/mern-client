import { configureStore } from "@reduxjs/toolkit";
import { testsReducer } from "./slices/tests";
import { authReducer } from "./slices/auth";
import { createReducer } from "./slices/create";

const store = configureStore({
  reducer: {
    tests: testsReducer,
    auth: authReducer,
    crete: createReducer,
  },
});
export default store;
