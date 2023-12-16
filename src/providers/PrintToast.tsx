import React, { createContext, useRef, useContext, useEffect } from 'react'
import { Toast } from 'primereact/toast';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setMessage } from '../feature/message/messageSlice';
import { enqueueSnackbar } from 'notistack';


interface ToastProviderProps {
    children: React.ReactNode
}

export const ContextToast = createContext<{ toastRef: React.RefObject<Toast> | null }>({
    toastRef: null
});

export function ToastProvider({ children }: ToastProviderProps) {
    const toast = useRef<Toast>(null);
    const dispatch = useAppDispatch()
    const message = useAppSelector(state => state.messageReducer)

    useEffect(() => {
      
        if (message.message != "") {
            enqueueSnackbar(message.message, { variant: message.type == "warn" ? "warning" : message.type, style: { zIndex: 999999999999999 } })
            dispatch(setMessage({ message: "", type: 'success' }))
        }
    }, [message])

    return (
        <ContextToast.Provider value={{
            toastRef: toast
        }}>
            <Toast ref={toast} />
            {children}
        </ContextToast.Provider>
    )
}

