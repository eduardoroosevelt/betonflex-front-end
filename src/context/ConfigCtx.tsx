import { ReactNode, createContext, useRef } from 'react';

import { Toast } from 'primereact/toast';
import { SnackbarProvider } from 'notistack';
import style from './ConfigCtx.module.css'

interface ConfigCtxProviderProps {
    children: ReactNode;
}
export const ConfigCtxProvider = (props: ConfigCtxProviderProps) => {
    return (
        <SnackbarProvider
            autoHideDuration={3000}
            classes={{
                containerRoot: style.notistackzIndex
            }}
            maxSnack={3}
            anchorOrigin={{
                vertical: "top", horizontal: "right"
            }}
        >
            {props.children}
        </SnackbarProvider >
    )
}