import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

import { AuthStackParamList } from '../../navigation';
import AuthService from '../../services/authService';

type RegistrationFromProps = StackScreenProps<AuthStackParamList, "RegistrationScreen">;

export default function RegistrationForm({ navigation }: RegistrationFromProps) { //TODO: change
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordStrong, setPasswordStrong] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const isValid = emailRegex.test(email);
        setEmailValid(isValid);
    };

    const validatePassword = (password: string) => {
        // Example of a strong password: at least 8 characters, with numbers and letters
        const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
        const isStrong = passwordRegex.test(password);
        setPasswordStrong(isStrong);
    };
    const handleRegistration = () => {
        AuthService.registerUser(email, password).then(() => {
            navigation.popToTop();
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => {
                        setEmail(text);
                        validateEmail(text);
                    }}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => {
                        setPassword(text);
                        validatePassword(text);
                    }}
                    value={password}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: (emailValid && passwordStrong) ? 'orange' : 'gray' }}
                    onPress={handleRegistration}
                    disabled={!(emailValid && passwordStrong)}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                {(!emailValid || !passwordStrong) && (
                    <Text>
                        Hint: password must be at least 8 characters including numbers and letters.
                    </Text>
                )}
                <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
                    <Text style={styles.registerText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
