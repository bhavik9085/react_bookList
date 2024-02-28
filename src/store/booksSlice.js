import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    loading: "loading",
  },
  reducers: {
    cleanBooks: () => {
      return { books: [], status: "idle" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = "pending";
        state.loading = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "success";
        state.books = action.payload;
        state.loading = "success";
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = "rejected";
        console.log("rejected", action.error);
      })

      .addCase(toggleRead.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(toggleRead.fulfilled, (state, action) => {
        state.books.map((book) => {
          if (book.id == action.payload) {
            book.isRead = !book.isRead;
          }
        });
        state.loading = "success";
      })
      .addCase(toggleRead.rejected, (state, action) => {
        state.loading = "rejected";
        console.log("rejected", action.error);
      })

      .addCase(eraseBook.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(eraseBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id != action.payload);
        state.loading = "success";
      })
      .addCase(eraseBook.rejected, (state, action) => {
        state.loading = "rejected";
        console.log("rejected", action.error);
      })

      .addCase(addBook.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.loading = "success";
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = "rejected";
        console.log("rejected", action.error);
      });
  },
});

export const { cleanBooks } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;

export const fetchBooks = createAsyncThunk("books/fetchBooks", async (uid) => {
  const q = query(collection(db, "bookList"), where("user_id", "==", uid));
  const querySnapshot = await getDocs(q);
  let initialData = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    data.id = doc.id;
    initialData.push(data);
  });
  return initialData;
});

export const toggleRead = createAsyncThunk(
  "books/toggleRead",
  async (action) => {
    const toggleRef = doc(db, "bookList", action.id);
    await updateDoc(toggleRef, {
      isRead: action.value,
    });
    return action.id;
  }
);

export const eraseBook = createAsyncThunk("books/eraseBook", async (action) => {
  await deleteDoc(doc(db, "bookList", action.id));
  return action.id;
});

export const addBook = createAsyncThunk("books/addBook", async (newBook) => {
  newBook.user_id = auth.currentUser.uid;
  const docRef = await addDoc(collection(db, "bookList"), newBook);
  newBook.id = docRef.id;
  return newBook;
});
