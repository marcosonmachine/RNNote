import firestore from '@react-native-firebase/firestore';
import Note from '../model/notes/note';

//refactor names
namespace NoteService {
    export const createNote = async (props: { note: Note }) => {
        await firestore()
            .collection("users")
            .doc(props.note.creatorId)
            .collection("Notes")
            .doc(props.note.id)
            .set(props.note);
    }

    export const updateNote = async (note: Partial<Note>) => {
        await firestore()
            .collection("users")
            .doc(note.creatorId)
            .collection("Notes")
            .doc(note.id)
            .set(note);
    }

    export const deleteNote = async (note: Note) => {
        await firestore()
            .collection("users")
            .doc(note.creatorId)
            .collection("Notes")
            .doc(note.id)
            .delete();
    }

    type deleteNotesProps = {
        creatorId: string,
        noteIDs: Array<string>,
    }
    export const deleteNotes = async ({ creatorId, noteIDs }: deleteNotesProps) => {
        const query = await firestore()
            .collection("users")
            .doc(creatorId)
            .collection("Notes")
            .where('id', 'in', noteIDs)
            .get()
        query.forEach(
            element => element.ref.delete()
        );
    }

    export const getUserNotes = async (userId: string) => {
        return await firestore()
            .collection('users')
            .doc(userId)
            .collection("Notes")
            .get();

    }
}

export default NoteService;