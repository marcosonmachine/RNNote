import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../../services/authService";
import AuthReducer from "./authReducers";
import AuthState from "./authState";

// Just to change loading screen
export const loginThunk = createAsyncThunk(
    "authSlice/login",
    async (props: { email: string, password: string }) => {
        const response = await AuthService.loginUser(props.email, props.password);
        return response.user;
    }
)

const authSlice = createSlice({
    name: "authSlice",
    initialState: AuthState.initialState,
    reducers: {
        setUser: AuthReducer.setUser,
        setClean: AuthReducer.setClean,
        setLoading: AuthReducer.getLoadingReducer(),
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, AuthReducer.getLoadingReducer(true))
            .addCase(loginThunk.fulfilled, AuthReducer.getLoadingReducer(false))
            .addCase(loginThunk.rejected, AuthReducer.getLoadingReducer(false))
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

