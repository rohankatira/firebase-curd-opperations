// src/features/books/bookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

// Collection reference
const booksCollection = collection(db, "books");

// Async Thunks
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const snapshot = await getDocs(booksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  const docRef = await addDoc(booksCollection, book);
  return { id: docRef.id, ...book };
});

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await deleteDoc(doc(db, "books", id));
  return id;
});

export const updateBook = createAsyncThunk("books/updateBook", async (book) => {
  const { id, ...data } = book;
  await updateDoc(doc(db, "books", id), data);
  return book;
});

// Slice
const BookSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.list = state.list.filter((book) => book.id !== action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.list.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export default BookSlice.reducer;
