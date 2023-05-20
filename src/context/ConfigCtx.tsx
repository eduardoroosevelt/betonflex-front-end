import { ReactNode, createContext, useRef } from 'react';

import { Toast } from 'primereact/toast';
import { SnackbarProvider } from 'notistack';

interface ToastProps {
    severity: 'error' | 'success' | 'info' | 'warn';
    summary: string;
    detail: string;
    life: number;
}

export const ConfigCtx = createContext({});

interface ConfigCtxProviderProps {
    children: ReactNode;
}
export const ConfigCtxProvider = (props: ConfigCtxProviderProps) => {
    

    return (
        <ConfigCtx.Provider value={{}}>
            <SnackbarProvider
                autoHideDuration={2000}
                maxSnack={3}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                {props.children}
            </SnackbarProvider>
        </ConfigCtx.Provider>
    );
};
