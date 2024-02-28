import { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit/react";
import Note from "../../../model/notes/note";
import NoteState from "./noteState";

namespace NoteReducer {
    export function setNote(state: NoteState.NoteStateType, action: PayloadAction<Partial<Note>>) {
        const index = state.notes.findIndex((note) => action.payload.id == note.id);
        if (index != -1) {
            state.notes[index] = { ...state.notes[index], ...action.payload };
        }
    }
    export function setNotes(state: NoteState.NoteStateType, action: PayloadAction<Array<Note>>) {
        state.notes = action.payload;
    }
    export function addNote(state: NoteState.NoteStateType, action: PayloadAction<Note>) {
        state.notes = [...state.notes, action.payload];
    }
    export function addNotes(state: NoteState.NoteStateType, action: PayloadAction<Array<Note>>) {
        state.notes = [...state.notes, ...action.payload]
    }
    export function deleteNote(state: NoteState.NoteStateType, action: PayloadAction<Note>) {
        const indexToRemove = state.notes.findIndex((note) => note.id == action.payload.id);
        if (indexToRemove != -1) {
            state.notes.splice(indexToRemove, 1);
        }
    }
    export function deleteNotes(state: NoteState.NoteStateType, action: PayloadAction<Array<string>>) {
        state.notes = state.notes.filter(note => !action.payload.includes(note.id))
    }
    export function deleteAllNotes(state: NoteState.NoteStateType) {
        state.notes = [];
    }
}

export default NoteReducer;