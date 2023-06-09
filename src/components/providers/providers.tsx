'use client';

import { store } from '@/store/store';
import { ThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    );
}
