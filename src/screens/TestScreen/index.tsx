import React from 'react';

import { Text } from "react-native";
import SafeAreaViewWrapper from "../../components/SafeAreaViewWrapper";
import { StackScreenProps } from "@react-navigation/stack";

import { MainStackParamList } from "../../navigation";
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reduxStore';

import Note from '../../model/notes/note';

type Props = StackScreenProps<MainStackParamList, 'TestScreen'>;


export default function TestScrenn ({route, navigation}: Props) {
    const notes = useSelector((state: RootState) => state.notesData.notes.find( (note: Note) => note.id == route.params.noteId) );
    console.log(notes);
    
    return (
     <SafeAreaViewWrapper>

            <Text>
                {route.params.noteId}
            </Text>
     </SafeAreaViewWrapper>
    )
}
