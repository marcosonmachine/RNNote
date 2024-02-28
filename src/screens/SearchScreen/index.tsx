import React, { useState } from 'react';
import { View, TextInput, FlatList, useColorScheme, ListRenderItem, ListRenderItemInfo } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reduxStore';
import NoteView from '../../components/NoteView';
import Note from '../../model/notes/note';

const SearchScreen = () => {
    const colorScheme = useColorScheme();
    const [searchQuery, setSearchQuery] = useState('');
    const notes = useSelector((state: RootState) => state.notesData.notes);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
        ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: ListRenderItemInfo<Note>) => (
        NoteView({ note: item, colorScheme })
    )

    return (
        <View>
            <TextInput
                placeholder="Search notes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{padding: 24}}
            />
            <FlatList
                data={filteredNotes}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default SearchScreen;
