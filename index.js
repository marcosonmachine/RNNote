import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';

import App from './App';
import store from './src/redux/reduxStore';


const ReduxApp = () => (
    <Provider store={store} >
        <App />
    </Provider>
)


AppRegistry.registerComponent(appName, () => ReduxApp);
