import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import NoteState from "./noteState";
import NoteReducer from './noteReducers';

const noteSlice = createSlice({
    name: "noteSlice",
    initialState: NoteState.initalState,
    reducers: {
        setNote: NoteReducer.setNote,
        setNotes: NoteReducer.setNotes,
        addNote: NoteReducer.addNote,
        addNotes: NoteReducer.addNotes,
        deleteNote: NoteReducer.deleteNote,
        deleteNotes: NoteReducer.deleteNotes,
        deleteAllNotes: NoteReducer.deleteAllNotes,
    },
        extraReducers: (builder) => {
        builder
    }
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;