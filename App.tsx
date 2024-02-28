import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import Navigation from './src/navigation/'


function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    //TODO: share accross the state
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Navigation />
    );
}

export default App;
