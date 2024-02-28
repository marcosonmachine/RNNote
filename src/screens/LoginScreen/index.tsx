import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import type { StackScreenProps } from '@react-navigation/stack';

import SafeAreaViewWrapper from '../../components/SafeAreaViewWrapper';
import { AuthStackParamList } from '../../navigation';
import { loginThunk } from '../../redux/reducers/auth/authSlice';
import { AppDispatch } from '../../redux/reduxStore';

type Props = StackScreenProps<AuthStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const dispatch = useDispatch<AppDispatch>()

    const handleLogin = async () => {
        dispatch(loginThunk({ email, password }));
    };
    return (
        <SafeAreaViewWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={hidePassword}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.togglePassword}
                    onPress={() => setHidePassword(!hidePassword)}
                >
                    <Text>Show Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.replace('RegistrationScreen')}>
                    <Text style={styles.registerText}>Don't have an account? Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaViewWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    registerText: {
        color: '#0000ff',
        marginTop: 15,
    },
    keyboardView: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 50,
        marginVertical: 10,
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    togglePassword: {
        alignSelf: 'flex-end',
        marginRight: '10%',
        marginBottom: 10,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});

