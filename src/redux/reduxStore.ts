import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth/authSlice';
import notesReducer from './reducers/note/noteSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        notesData: notesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;