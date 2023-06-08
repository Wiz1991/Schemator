import editorReducer from '@/store/editor/editor.reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        editor: editorReducer,
    },
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
