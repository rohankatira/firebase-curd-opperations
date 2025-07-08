// src/redux/bookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const booksCollection = collection(db, "books");

export const fetchBooks = createAsyncThunk("books/fetch", async () => {
  const snapshot = await getDocs(booksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addBook = createAsyncThunk("books/add", async (book) => {
  const docRef = await addDoc(booksCollection, book);
  return { id: docRef.id, ...book };
});

export const deleteBook = createAsyncThunk("books/delete", async (id) => {
  await deleteDoc(doc(db, "books", id));
  return id;
});

export const updateBook = createAsyncThunk("books/update", async ({ id, data }) => {
  await updateDoc(doc(db, "books", id), data);
  return { id, data };
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.list = state.list.filter((book) => book.id !== action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.list.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { id: action.payload.id, ...action.payload.data };
        }
      });
  },
});

export default bookSlice.reducer;
