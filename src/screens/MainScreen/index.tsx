import React, { useEffect } from 'react';
import { Text, StyleSheet, Dimensions, useColorScheme, ColorSchemeName, View, StyleProp, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import NoteService from '../../services/noteService';
import { MainStackParamList } from '../../navigation';
import { AppDispatch, RootState } from '../../redux/reduxStore';
import SafeAreaViewWrapper from '../../components/SafeAreaViewWrapper';
import Note from '../../model/notes/note';
import BouncyComponent from '../../components/BouncyWrapper';
import NoteView from '../../components/NoteView';
import { arraysAreEqual } from '../../utils/utils';
import { noteActions } from '../../redux/reducers/note/noteSlice';


type Props = StackScreenProps<MainStackParamList, 'MainScreen'>;

export default function MainScreen({ navigation }: Props): React.ReactElement {
    const colorScheme = useColorScheme();
    const windowWidth = Dimensions.get('window').width;

    const dispatch = useDispatch<AppDispatch>();

    const user = auth().currentUser!;
    const data = useSelector((state: RootState) => state.notesData.notes);

    // Create selection mode
    const [selectionMode, selectionModeChange] = useState<boolean>(false);
    const [selected, select] = useState<Array<string>>([]);
    const addToSelected = (noteId: string) => {
        const set = new Set([...selected, noteId]);
        select(Array.from(set));
    }
    const deleteFromSelected = (noteId: string) => {
        select(selected.filter(x => x != noteId));
    }
    const switchSelection = (noteId: string) => {
        if (selected.includes(noteId))
            deleteFromSelected(noteId);
        else
            addToSelected(noteId);
    }
    const deleteSelectedNotes = async () => {
        NoteService.deleteNotes({ creatorId: user.uid, noteIDs: selected }).then(
            () => dispatch(noteActions.deleteNotes(selected))
        );
    }

    const startSelectionMode = (noteid: string) => {
        select([noteid])
        selectionModeChange(true);
    }
    const closeSelectionMode = () => {
        select([]);
        selectionModeChange(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            const notesSnapshot = await NoteService.getUserNotes(user.uid);
            const notesData = notesSnapshot.docs.map(x => x.data() as Note);
            if (!arraysAreEqual(notesData, data)) {
                dispatch(noteActions.setNotes(notesData));
            }
        };
        fetchData();
    }, [data]);


    const handleCreateNote = () => {
        const note = Note.createWithCreatorId(user.uid);
        NoteService.createNote({ note });

        navigation.push('NoteScreen', { note: note });
        dispatch(noteActions.addNote(note));
    }
    //TODO: later remove quotes for user?.email
    //TODO: On Icon, onPress={() => setVisible(!visible)} .
    return (
        <SafeAreaViewWrapper>
            <BouncyComponent>
                <View style={{ padding: 10, flexDirection: "row", justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Notes</Text>
                    {!selectionMode &&
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="search" style={{ paddingEnd: 8 }} size={28} onPress={() => navigation.push("SearchScreen")} />
                            <Icon name="create-outline" style={{ paddingEnd: 2 }} size={28} onPress={() => handleCreateNote()} />
                        </View>
                    }
                    {selectionMode &&
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="trash" style={{ paddingEnd: 8 }} size={28} onPress={() => deleteSelectedNotes()} />
                            <Icon name="exit" style={{ paddingEnd: 2 }} size={28} onPress={() => closeSelectionMode()} />
                        </View>
                    }
                </View>
                <BouncyComponent>
                    <FlatList numColumns={Math.floor(windowWidth / 200)}
                        data={data} renderItem={
                            ({ item }) => {
                                // NoteView for noteData, navigation for on press, colorScheme for text and color palette 
                                if (selectionMode) {
                                    const isSelected = selected.includes(item.id);
                                    return (
                                        <TouchableOpacity onPress={() => switchSelection(item.id)} style={[{ flex: 1, width: 200, }]}>
                                            <NoteView note={new Note(item.id, item.title, item.content, item.createdAt, item.updatedAt, item.paletteColor)} colorScheme={colorScheme} style={[isSelected && { borderColor: 'neonColor', borderWidth: 2, borderRadius: 5, }]} />
                                        </TouchableOpacity>
                                    )
                                }
                                return (
                                    <TouchableOpacity onLongPress={() => startSelectionMode(item.id)} onPress={() => navigation.push('NoteScreen', { note: item })} style={{ flex: 1, width: 200 }}>
                                        <NoteView note={new Note(item.id, item.title, item.content, item.createdAt, item.updatedAt, item.paletteColor)} colorScheme={colorScheme} />
                                    </TouchableOpacity>
                                )
                            }
                        } scrollEnabled />
                </BouncyComponent>
            </BouncyComponent>
        </SafeAreaViewWrapper >
    );
}