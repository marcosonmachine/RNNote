import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { firebase } from '@react-native-firebase/auth';

import { authActions } from '../redux/reducers/auth/authSlice';
import { RootState } from '../redux/reduxStore';

import RegistrationScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import NoteScreen from '../screens/NoteScreen';
import LoadingPage from '../components/LoadingPage/LoadingPage';

import TestScreen from '../screens/TestScreen';
import SearchScreen from '../screens/SearchScreen';
import Note from '../model/notes/note';


export type MainStackParamList = {
    MainScreen: undefined;
    LoadingPage: undefined;
    NoteScreen: { note: Note};
    SearchScreen: undefined;
    TestScreen: { noteId: string };
};

export type AuthStackParamList = {
    RegistrationScreen: undefined;
    LoginScreen: undefined;
};
export type LoadingStackParamList = {
    LoadingScreen: undefined;
}

const AuthStack = createStackNavigator<AuthStackParamList>();
const UserStack = createStackNavigator<MainStackParamList>();
const LoadingStack = createStackNavigator<LoadingStackParamList>();


const Navigation = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state: RootState) => state.auth);


    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(user => {
            dispatch(authActions.setUser(user?.toJSON()));
        });
        return subscriber; // unsubscribe on unmount
    }, [dispatch]);

    return (
        <NavigationContainer>
            {(loading == true) ? <LoadingStackNavigation /> : (user != undefined) ? <UserStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};
// For unauthenticated users
function AuthStackNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
}

// For authenticated users
function UserStackNavigator() {
    return (
        <UserStack.Navigator>
            <UserStack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
            <UserStack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
            <UserStack.Screen name="NoteScreen" component={NoteScreen} options={{ headerShown: false }} />
            <UserStack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <UserStack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} />
        </UserStack.Navigator>
    );
}

function LoadingStackNavigation() {
    return (
        <LoadingStack.Navigator>
            <LoadingStack.Screen name="LoadingScreen" component={LoadingPage} options={{ headerShown: false }} />
        </LoadingStack.Navigator>
    )
}

export default Navigation;
