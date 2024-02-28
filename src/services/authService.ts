import auth from '@react-native-firebase/auth'

namespace AuthService {
    export const registerUser = async (email: string, password: string) => {
        const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
        return userCredentials;
    }

    export const loginUser = async (email: string, password: string) => {
        const userCredentials = await auth().signInWithEmailAndPassword(email, password);
        return userCredentials;
    }
}
export default AuthService;
// TODO:
// delete user
// logout user
// change user