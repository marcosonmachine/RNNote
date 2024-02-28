import Note from "../../../model/notes/note";

namespace NoteState {
    export interface NoteStateType {
        notes: Array<Note>;
        // Set sync loading
        loading: boolean;
    }

    export const initalState: NoteStateType = {
        notes: [],
        // Sync loading false by default
        loading: false
    }
}

export default NoteState;