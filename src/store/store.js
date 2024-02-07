import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice.js';
import notesReducer from './notesSlice.js';
import userReducer from './userSlice.js';

export default configureStore({
  reducer: {
    books: booksReducer,
    notes: notesReducer,
    user: userReducer
  }
})