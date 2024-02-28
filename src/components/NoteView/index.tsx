import { ColorSchemeName, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Note from "../../model/notes/note";
import { DarkColors, LightColors, getTimeAgo } from "../../utils/utils";

type NoteViewProps = {
    note: Note;
    colorScheme: ColorSchemeName;
    style?: StyleProp<ViewStyle> | undefined;
}

export default function NoteView ({ note, colorScheme, style }: NoteViewProps): React.ReactElement {
    const colors = colorScheme == 'dark' ? DarkColors : LightColors;
    return (
        <View style={[styles.container, { backgroundColor: colors[note.paletteColor] }, style]}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.title, colorScheme == "dark" ? styles.input_dark : styles.input_light]}>{note.title}</Text>
            <Text style={[styles.content, colorScheme == "dark" ? styles.input_dark : styles.input_light]}>{note.content}</Text>
            <Text style={[styles.updatedAt, colorScheme == "dark" ? styles.input_dark : styles.input_light]}>{getTimeAgo(new Date(note.updatedAt))}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        margin: 10,
        borderRadius: 12,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#fff",
    },
    content: {
        fontSize: 16,
        color: "#fff",
    },
    updatedAt: {
        fontSize: 12,
        color: "#fff",
        alignSelf: 'flex-end',
    },

    // Repetative code can be refactored
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
});