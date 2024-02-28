namespace AuthState {
    export interface AuthState {
        user: Object | undefined;
        loading: boolean;
    }

    export const initialState: AuthState = {
        user: undefined,
        loading: false
    };
}

export default AuthState;