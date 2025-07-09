// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/books/bookSlice";
import authReducer from "../features/auth/authslice";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
  },
});
