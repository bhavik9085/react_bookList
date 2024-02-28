import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  writeBatch,
} from "firebase/firestore";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    status: "idle",
    notes: [],
    loading: "loading",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = action.payload;
        state.loading = "success";
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = "rejected";
        console.log("Notes rejected", action.error);
      })

      .addCase(addNote.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.loading = "success";
      })
      .addCase(addNote.rejected, (state, action) => {
        console.log("Notes rejected", action.error);
        state.loading = "rejected";
      })

      .addCase(eraseNote.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(eraseNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id != action.payload);
        state.loading = "success";
      })
      .addCase(eraseNote.rejected, (state, action) => {
        console.log("Notes rejected", action.error);
        state.loading = "rejected";
      })

      .addCase(eraseBookNotes.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(eraseBookNotes.fulfilled, (state, action) => {
        state.notes = state.notes.filter(
          (note) => note.book_id != action.payload
        );
        state.loading = "success";
      })
      .addCase(eraseBookNotes.rejected, (state, action) => {
        console.log("Notes rejected", action.error);
        state.loading = "rejected";
      });
  },
});

export const selectNotes = (state) => state.notes;

export default notesSlice.reducer;

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (uid) => {
  const q = query(collection(db, "notes"), where("user_id", "==", uid));
  const querySnapshot = await getDocs(q);
  let initialData = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    data.id = doc.id;
    initialData.push(data);
  });
  return initialData;
});

export const addNote = createAsyncThunk("books/addNote", async (newNote) => {
  newNote.user_id = auth.currentUser.uid;
  const docRef = await addDoc(collection(db, "notes"), newNote);
  newNote.id = docRef.id;
  return newNote;
});

export const eraseNote = createAsyncThunk("books/eraseNote", async (action) => {
  await deleteDoc(doc(db, "notes", action.id));
  return action.id;
});

export const eraseBookNotes = createAsyncThunk(
  "books/eraseBookNotes",
  async (action) => {
    const batch = writeBatch(db);
    action.notesToDel.forEach(function (note) {
      const ref = doc(db, "notes", note.id);
      batch.delete(ref);
    });
    await batch.commit();
    return action.id;
  }
);
