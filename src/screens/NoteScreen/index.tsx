import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, TextInput, StyleSheet, FlatList, Pressable, useColorScheme, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import Note from '../../model/notes/note';
import { AppDispatch } from '../../redux/reduxStore';
import { noteActions } from '../../redux/reducers/note/noteSlice';
import NoteService from '../../services/noteService';
import BouncyComponent from '../../components/BouncyWrapper';
import { LightColors, DarkColors } from '../../utils/utils';
import { MainStackParamList } from '../../navigation';
import { useDebouncedCallback } from 'use-debounce';


type NoteScreenProps = StackScreenProps<MainStackParamList, 'NoteScreen'>;


export default function NoteScreen({ route, navigation }: NoteScreenProps) {
    const dispatch = useDispatch<AppDispatch>();

    const note = route.params.note;
    const [currentNote, changeCurrentNote] = useState<Note>(note);


    const colorScheme = useColorScheme();
    const colors = colorScheme == 'dark' ? DarkColors : LightColors;

    const height = useSharedValue(0);
    const handlePress = () => {
        height.value = withSpring(height.value == 0 ? 42 : 0);
    };

    const handleDeleteNote = async (note: Note) => {
        NoteService.deleteNote(note)
        navigation.pop()
    }
    const syncNotes = useDebouncedCallback(NoteService.updateNote, 3000);
    const handleonChangeNote = (value: Partial<Note>) => {
        const changedNote: Note = { ...currentNote, ...value };
        changeCurrentNote(changedNote);

        dispatch(noteActions.setNote(changedNote));
        syncNotes(changedNote);
    }
    const titleDebounced = (title: string) => handleonChangeNote({ title })
    const contentDebounced = (content: string) => handleonChangeNote({ content })


    const [backgroundColor, setBackgroundColor] = useState(colors[note?.paletteColor ?? 0]);

    const renderColorOption = (item: string) => (
        <Pressable
            onPress={() => setBackgroundColor(item)}
            style={[(colorScheme == 'dark' ? styles.colorButton_dark : styles.colorButton_light), { backgroundColor: item }]}
        />
    );
    if (note == null) {
        return (<View></View>);
    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <BouncyComponent>
                <View style={{ justifyContent: "space-between", alignItems: 'center', flexDirection: "row" }}>
                    <TextInput
                        style={[(colorScheme == "dark" ? styles.input_dark : styles.input_light), styles.title]}
                        placeholder="Title"
                        value={currentNote.title}
                        onChangeText={titleDebounced}
                    />
                    <Icon name='trash' onPress={() => handleDeleteNote(note)} size={34} style={{ padding: 12, backgroundColor: colorScheme == "dark" ? "gray" : "skyblue", color: "white" }}></Icon>
                </View>
                <TextInput
                    style={[(colorScheme == "dark" ? styles.input_dark : styles.input_light), styles.content]}
                    placeholder="Content"
                    multiline
                    value={currentNote.content}
                    onChangeText={contentDebounced}
                />
            </BouncyComponent>
            <Animated.View style={{ height, padding: 0 }}>
                <FlatList
                    scrollEnabled={false}
                    style={{ ...(colorScheme == 'dark' ? styles.colorPalette_dark : styles.colorPalette_light) }}
                    data={colors}
                    renderItem={({ item }) => (renderColorOption(item))}
                    keyExtractor={(item) => item}
                    horizontal
                />
            </Animated.View>
            <View style={[styles.bottomBox, (colorScheme == 'dark' ? styles.bg_dark : styles.bg_light)]}>
                <Icon name="color-palette-sharp" size={28} onPress={handlePress} style={(colorScheme == "dark" ? styles.color_dark : styles.color_light)} />
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    bottomBox: {
        maxHeight: 300,
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 6,
        borderRadius: 6
    },
    bg_dark: {
        backgroundColor: 'black'
    },
    bg_light: {
        backgroundColor: 'white'
    },
    color_dark: {
        color: 'white'
    },
    color_light: {
        color: 'black'
    },
    container: {
        height: '100%'
    },
    input_dark: {
        padding: 16,
        color: 'white',
        verticalAlign: 'top',
    },
    input_light: {
        padding: 16,
        color: 'black',
        verticalAlign: 'top',
    },
    title: {
        marginBottom: 20,
        padding: 10,
        fontSize: 33,
    },
    content: {
        fontSize: 18,
    },
    colorButton_dark: {
        width: 24,
        height: 24,
        borderRadius: 500,
        margin: 3,
        borderColor: 'black',
        borderWidth: 1.5,
    },
    colorButton_light: {
        width: 24,
        height: 24,
        borderRadius: 500,
        margin: 3,
        borderColor: 'white',
        borderWidth: 1.5,
    },
    colorPalette_dark: {
        flex: 1,
        maxHeight: 42,
        width: "100%",
        backgroundColor: 'black',
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    colorPalette_light: {
        flex: 1,
        maxHeight: 42,
        width: "100%",
        backgroundColor: 'white',
        paddingHorizontal: 4,
        paddingVertical: 4,
    }
});

