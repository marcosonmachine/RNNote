import { PayloadAction } from "@reduxjs/toolkit/react";

namespace AuthReducer {
    export function setUser(state: AuthState, action: PayloadAction<Object | undefined>) {
        state.user = action.payload;
    }
    export function setClean(state: AuthState) {
        state.user = undefined;
    }
    export function getLoadingReducer(value?: boolean) {
        return function setLoading(state: AuthState, action: PayloadAction<any>) {
            state.loading = value ?? action.payload;
        }
    }
}

export default AuthReducer;