import React from 'react';
import { useColorScheme, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type SafeAreaViewWrapperProps = {
    children: JSX.Element;
}
export default function({ children } : SafeAreaViewWrapperProps) {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const containerStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    };
    return (
        <SafeAreaView style={[containerStyle, backgroundStyle]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            {children}
        </SafeAreaView>
    )
}
